const BusinessModel = require('../models/BusinessModel');

const getAllBusiness = async (req, res) => {
    let code = 204;
    let message = 'Not Business found';
    try {
        const responseModelBusiness = await BusinessModel.getAllBusiness();

        const business = responseModelBusiness.map(businessRow => ({
            id: businessRow.id,
            name: businessRow.namebussiness
        }));

        if (business.length > 0){
            code = 200
            message = 'Found Business';
        }
        
        return res.status(code).json({
            status: 'Success',
            message: message,
            data: business
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

module.exports = { getAllBusiness };