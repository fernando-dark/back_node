const TagModel = require('../models/TagModel');


const getAllTags = async (req, res) => {
    let code = 204;
    let message = 'Not tags found';
    try {
        const responseModelTag = await TagModel.getAllTags();

        const tags = responseModelTag.map(tag => ({
            id: tag.id,
            name: tag.nametag
        }));
        
        if (tags.length > 0){
            code = 200
            message = 'Found tags';
        }
        return res.status(code).json({
            status: 'Success',
            message: message,
            data: tags
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

module.exports = { getAllTags };