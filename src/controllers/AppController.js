const { App, MethodAccess, AppMethodAccess, Tags, AppTags, Responsable, AppResponsable, Bussiness, AppBussiness  } = require('../models');
const S3Bucket = require('../utils/S3Bucket');

const s3Bucket = new S3Bucket({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    bucketName: process.env.BUCKETNAME,
});

const addApp = async (req, res) => {
    try {
        const { name, description, methodsAccess, url, bussiness, tags, responsables } = req.body;

        const fileKey = `${Date.now()}-${req.file.originalname}`;
        const responseUpdate = s3Bucket.uploadImage(req, fileKey);

        const appData = {
            imageurlapp: fileKey,
            nameapp: name,
            descriptionapp: description,
            statusapp: 1,
            urlapp: url
        };

        const responseModel = await App.addApp(appData);
        if ( responseModel && responseUpdate ) { // && responseUpdate 

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
            let arrayTags = [];
            let objectTag = {};
            if (tags && typeof tags === 'string') {
                try {
                    const formattedTags = tags.replace(/'/g, '"');
                    parsedTags = JSON.parse(formattedTags);
                    parsedTags = parsedTags.map(item => ({
                        id: item.id === null ? 'DEFAULT' : item.id,
                        nametag: item.name,
                    }));
                    
                    for (const tag of parsedTags) {
                        if (tag.id === 'DEFAULT') {
                            objectTag = {
                                nametag: tag.nametag
                            }
                        } else {
                            // Asociar el tag existente si el id no es "DEFAULT"
                            const dataTags = {
                                appid: responseModel.id,
                                tagid: tag.id,
                                updated_at: new Date(),
                                created_at: new Date(),
                            };
                            arrayTags.push(dataTags);
                        }
                    }

                    var isEmptyObj = Object.keys(objectTag).length;

                    if ( isEmptyObj > 0 ){
                        Tags.saveOnlyTag(objectTag).then(responseModelTags => {
                            const dataTags = {
                                appid: responseModel.id,
                                tagid: responseModelTags.id,
                                updated_at: new Date(),
                                created_at: new Date(),
                            };
                            return AppTags.saveAppTags([dataTags]);
                        }).catch(error => console.error('Error guardando nuevo tag:', error));
                    }
                    
                    if ( arrayTags.length > 0) {
                        const responseModelAppTags = AppTags.saveAppTags(arrayTags);
                    }
                } catch (error) {
                    console.error('Error al parsear tags:', error);
                }
            }

            /** Save Bunisess */
            let parsedBussiness = [];
            if (bussiness && typeof bussiness === 'string') {
                try {
                    const formattedBussiness = bussiness.replace(/'/g, '"');
                    parsedBussiness = JSON.parse(formattedBussiness);
                    const data = parsedBussiness.map(bussiness => {
                        return {
                            appid: responseModel.id,
                            bussinessid: bussiness.id,
                            updated_at:  new Date(),
                            created_at:  new Date()
                        };
                    });
                    const responseModelAppBussiness = AppBussiness.saveAppBussiness(data);
                } catch (error) {
                    console.log('Error al parsear Bussiness')
                }
            }

            /** Save Responsables */
            let parsedResponsables = [];
            if ( responsables ) {
                if (responsables && typeof responsables === 'string') {
                    try {
                        const formattedResponsables = responsables.replace(/'/g, '"');
                        parsedResponsables = JSON.parse(formattedResponsables);
                        parsedResponsables = parsedResponsables.map(item => {
                            return { ...item, nombre: item.name };
                        });
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
        console.log('Error', error);
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
            ],
            include: [
                {
                    model: AppBussiness,
                    required: false,
                    attributes: [['id', 'bussinessKey']],
                    include: [
                        {
                            model: Bussiness,
                            as: 'bussines',
                            attributes: [
                                ['id', 'bussiness_id'],
                                ['namebussiness', 'bussiness_name']
                            ],
                        }
                    ]
                },
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
                            ['nombre', 'name']
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