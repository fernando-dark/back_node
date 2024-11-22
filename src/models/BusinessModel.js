// businessModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Business = sequelize.define('Business', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        namebussiness: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        tableName: 'bussiness',
        timestamps: false, // Evita que Sequelize maneje automáticamente `createdAt` y `updatedAt`
    }
);

/**
 *  Method for get bunisess
 * @param {*} data 
 * @returns object or string
*/
Business.getAllBusiness = async function () {
    try {
        const business = await Business.findAll();
        return business.map(business => business.get()); // Mapear los resultados para devolver un array de objetos
    } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = Business;
