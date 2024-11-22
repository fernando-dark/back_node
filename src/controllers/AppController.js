const { App, MethodAccess, AppMethodAccess, Tags, AppTags, Responsable, AppResponsable  } = require('../models');
const S3Bucket = require('../utils/S3Bucket');

const s3Bucket = new S3Bucket({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    bucketName: process.env.BUCKETNAME,
});

const addApp = async (req, res) => {
    try {
        const { name, description, methodsAccess, url, bussines, tags, responsables } = req.body;

        const fileKey = `${Date.now()}-${req.file.originalname}`;
        const responseUpdate = s3Bucket.uploadImage(req, fileKey);

        const appData = {
            imageurlapp: fileKey,
            nameapp: name,
            descriptionapp: description,
            statusapp: 1,
            urlapp: url,
            bussines
        };
        
        const responseModel = await App.addApp(appData);
        if ( responseModel && responseUpdate ) {

            /** Save Access Methods **/
            let parsedMethodAccess = [];
            if (methodsAccess && typeof methodsAccess === 'string') {
                try {
                    const formattedMethodsAccess= methodsAccess.replace(/'/g, '"');
                    parsedMethodAccess = JSON.parse(formattedMethodsAccess);
                    const data = parsedMethodAccess.map(methoda => {
                        return {
                            appid: responseModel.id,
                            methodaccessid: methoda.id,
                            updated_at:  new Date(),
                            created_at:  new Date()
                        };
                    });
                    const responseModelAppTags = AppMethodAccess.saveAppMethodAccesss(data);
                } catch (error) {
                    console.log('Error al parsear Metodos')
                }
            }
    
            /** Save tags **/
            let parsedTags = [];
            if (tags && typeof tags === 'string') {
                try {
                    const formattedTags = tags.replace(/'/g, '"');
                    parsedTags = JSON.parse(formattedTags);
                    const data = parsedTags.map(tag => {
                        return {
                            appid: responseModel.id,
                            tagid: tag.id,
                            updated_at:  new Date(),
                            created_at:  new Date()
                        };
                    });
                    const responseModelAppTags = Tags.saveAppTags(data);
                } catch (error) {
                    console.log('Error al parsear tags')
                }
            }

            /** Save Responsables */
            let parsedResponsables = [];
            if ( responsables ) {
                if (responsables && typeof responsables === 'string') {
                    try {
                        const formattedResponsables = responsables.replace(/'/g, '"');
                        parsedResponsables = JSON.parse(formattedResponsables);
                        if ( parsedResponsables.length > 0) {
                            Responsable.saveResponsables(parsedResponsables).then(responseModelResponsable => {
                                const dataResposable = responseModelResponsable.map(responsable => {
                                    return {
                                        appid: responseModel.id,
                                        responsableid: responsable.id,
                                        updated_at:  new Date(),
                                        created_at:  new Date()
                                    };
                                });
                                AppResponsable.saveAppResponsable(dataResposable)
                            });
                        }
                        
                    } catch (error) {
                        console.log('Error al parsear responsables')
                    }
                }
            }
    
            return res.status(201).json({
                status: 'Success',
                message: 'Aplicación creada exitosamente',
                data: responseModel,
            });
        }

    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.status(400).json({
                status: 'Faild',
                error: `Error en la solicitud: ${error.message}`
            });
        } else if (error.response && error.response.status === 500) {
            return res.status(500).json({
                status: 'Faild',
                error: `Error interno del servidor: ${error.message}`
            });
        }
    }
};

const getAppWithDetails = async (req, res) => {
    try {
        const apps = await App.findAll({
            attributes: [
                ['id', 'appkey'],
                ['imageurlapp', 'image'],
                ['nameapp', 'name'],
                ['descriptionapp', 'description'],
                ['urlapp', 'url'],
                'bussines',
            ],
            include: [
                {
                    model: AppMethodAccess,
                    required: false,
                    attributes: [['id', 'methodKey']],
                    include: [
                        {
                            model: MethodAccess,
                            as: 'methods',
                            attributes: [
                                ['id', 'method_id'],
                                ['nameaccess', 'method_name']
                            ],
                        }
                    ]
                },
                {
                    model: AppTags,
                    required: false,
                    attributes: [['id', 'tagKey']],
                    include: [
                      {
                        model: Tags,
                        as: 'tags',
                        attributes: [
                            ['id', 'tag_id'],
                            ['nametag', 'name']
                        ],
                      }
                    ]
                },
                {
                    model: AppResponsable,
                    required: false,
                    attributes: [['id', 'responsableKey']],
                    include: [
                      {
                        model: Responsable,
                        as: 'responsablesa',
                        attributes: [
                            ['id', 'responsable_id'],
                            ['email', 'email']
                        ],
                      }
                    ]
                },
            ],
            limit: 10, // Limitar el número de resultados
            offset: 0,
            logging: console.log // Esto imprimirá la consulta SQL generada
        });

        for (const app of apps) {
            app.dataValues.image =  await s3Bucket.getSignedUrl(app.dataValues.image);
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Applications',
            data: apps,
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.status(400).json({
                status: 'Faild',
                error: `Error en la solicitud: ${error.message}`
            });
        } else if (error.response && error.response.status === 500) {
            return res.status(500).json({
                status: 'Faild',
                error: `Error interno del servidor: ${error.message}`
            });
        }
    }
};


module.exports = { addApp, getAppWithDetails };