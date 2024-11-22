const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const MethodAccess = sequelize.define('MethodAccess', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nameaccess: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, 
    {
        tableName: 'methodaccess',
        timestamps: false, // Evita que Sequelize maneje automáticamente `createdAt` y `updatedAt`
    }
);

/**
 *  Method for insert in table methodaccess
 * @param {*} data 
 * @returns promise
*/
MethodAccess.getAllMethodAccess = async function () {
    try {
        const methodsAccss = await MethodAccess.findAll();
        return methodsAccss.map(access => access.get()); // Mapear los resultados para devolver un array de objetos
    } catch (error) {
        console.error('Error al obtener las Metodos de Acceso', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = MethodAccess;