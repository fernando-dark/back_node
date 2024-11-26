const SocietyModel = require('../models/SocietyModel');

const searchSociety = async (req, res) => {

    try {
        const { search } = req.body;
        
        const responseModel = await SocietyModel.getBySearch(search);
        if ( responseModel ) {
            return res.status(200).json({
                status: 'Success',
                message: 'Found societies',
                data: responseModel,
            }); 
        } else {
            return res.status(204).json({
                status: 'Faild',
                message: 'Not Found',
                data: [],
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
}

module.exports = { searchSociety };