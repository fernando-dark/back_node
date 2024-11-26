const { App, MethodAccess, AppMethodAccess, Tags, AppTags, Responsable, AppResponsable, Bussiness, AppBussiness  } = require('../models');
const S3Bucket = require('../utils/S3Bucket');

const s3Bucket = new S3Bucket({
    accessKeyId: 'AKIAYEKP52QJOQUZAEOE',
    secretAccessKey: '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',
    region: 'us-east-2',
    bucketName: 'myliverpool',
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
                    const responseModelMethodAccess = AppMethodAccess.saveAppMethodAccesss(data);
                } catch (error) {
                    console.log('Error al parsear Metodos')
                }
            }
            
            /** Save Tags **/
            if (tags && typeof tags === 'string') {
                try {
                    const formattedTags = tags.replace(/'/g, '"');
                    parsedTags = JSON.parse(formattedTags);
                    const processedTags = await Promise.all(
                        parsedTags.map(async (tag) => {
                            // Buscar si ya existe el tag
                            const existingTag = await Tags.findOne({ where: { nametag: tag.nametag } });
        
                            if (existingTag) {

                                return existingTag;

                            } else {
                                return Tags.saveOnlyTag({
                                    nametag: tag.nametag,
                                    updated_at: new Date(),
                                    created_at: new Date(),
                                }).then(responseModelTags => {
                                    const dataTags = {
                                        appid: responseModel.id,
                                        tagid: responseModelTags.id,
                                        updated_at: new Date(),
                                        created_at: new Date(),
                                    };
                                    return AppTags.saveAppTags([dataTags]);
                                }).catch(error => console.error('Error guardando nuevo tag:', error));
                            }
                        })
                    );
                    console.log('response mmasive', processedTags)
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
                            return { ...item, nombre: item?.name ? item?.name : null, email: item?.email };
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
                message: 'Application created',
                data: responseModel,
            });
        } else {
            return res.status(200).json({
                status: 'Faild',
                message: 'Application cant created',
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

const deleteApp = async (req, res) => {
    try {
        const { id } = req.params;
        const responseModel = await App.updateStatusApp(id, 0);
        if ( responseModel === 0 ) {
            return res.status(200).json({
                status: 'Success',
                message: 'Not Found app for delete'
            });
        } else {
            return res.status(200).json({
                status: 'Success',
                message: 'App deleted'
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

const updateApp = async (req, res) => {
    try {
        const { name, description, methodsAccess, url, bussiness, tags, responsables } = req.body;
        const { id } = req.params;
        const fileKey = `${Date.now()}-${req.file.originalname}`;

        const appExists = await App.findByPk(id);
        if (!appExists) {
            return res.status(204).json({
                status: 'Faild',
                message: 'Application not found',
            });
        } else {
            const appData = {
                imageurlapp: fileKey,
                nameapp: name,
                descriptionapp: description,
                urlapp: url
            };
    
            const responseModel = await App.updateFieldsApp(id, appData);
            console.log('response', responseModel)
            if ( responseModel === 0 ) {
                return res.status(200).json({
                    status: 'Faild',
                    message: 'Application cant update',
                }); 
            } else {
                return res.status(200).json({
                    status: 'Success',
                    message: 'Application updated',
                });
            }
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
                            ['nombre', 'name'],
                            'email'
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
            message: 'Applications Found',
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


module.exports = { addApp, deleteApp, updateApp, getAppWithDetails };