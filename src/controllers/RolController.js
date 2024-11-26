const RolModel = require('../models/RoleModel');

const addRol = async (req, res) => {
    try {

        const { name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society } = req.body;
        const addrol = await RolModel.addRole({ name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society });

        res.status(201).json({
            message: addrol
        });

        res.status(200).json({
            message: 'el ROL EXISTE'
        });

        res.status(200).json({
            message: 'fallo la comunhcioon'
        });

    } catch (error) {
        console.log(`Error add rol ${error}`);

        if (error.response && error.response.status === 400) {
            return res.status(400).json({
                error: `Error en la solicitud: ${error.message}`
            });
        } else if (error.response && error.response.status === 500) {
            return res.status(500).json({
                error: `Error interno del servidor: ${error.message}`
            });
        }
    }
}

const allRoles = async (req, res) => {
    try {

        const roles = await RolModel.getAllRolls();

        res.status(201).json({
            roles: roles,
        });

    } catch (error) {
        console.log(`Error roles ${error}`);

        res.status(500).json({
            error: `Error al obtener los roles ${error}`
        });
    }
}

const editRole = async (req, res) => {
    try {

        const { name, groupsso, func, id } = req.body

        const editRole = await RolModel.editRole({ name, groupsso, func, id });
        res.status(202).json({
            editRole: editRole
        });
    } catch (error) {
        console.log(`Error  ${error}`);
        res.status(500).json({
            error: `error al   ${error}`
        });
    }
}

const deleteRole = async (req, res) => {

    try {
        const { id } = req.params;

        const deletedRole = await RolModel.deleteRole({ id });

        if (!deletedRole || deletedRole === 0) {
            return res.status(200).json({
                message: `No se encontró un rol con el ID ${id}`,
            });
        }

        res.status(200).json({
            message: `Rol ${id} eliminado correctamente`,
        });

    } catch (error) {
        console.log(`Error  ${error}`);

        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { addRol, allRoles, editRole, deleteRole };