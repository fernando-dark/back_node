const MethodAccessModel = require('../models/MethodAccessModel');

const getAllMethodAccess = async (req, res) => {
    var code = 204;
    var message = 'Not Methods found';
    try {
        const responseModelMethodAccess = await MethodAccessModel.getAllMethodAccess();

        const methodsAccess = responseModelMethodAccess.map(methodAccss => ({
            id: methodAccss.id,
            name: methodAccss.nameaccess
        }));

        if (methodsAccess.length > 0){
            code = 200
            message = 'Found Methods Access';
        }
        return res.status(code).json({
            status: 'Success',
            message: message,
            data: methodsAccess
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

module.exports = { getAllMethodAccess };