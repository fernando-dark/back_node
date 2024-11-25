// appBussinessModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const App = require('./AppModel'); // Importamos App
const Business = require('./BusinessModel'); // Importamos MethodAccess

const AppBussiness = sequelize.define('AppBussiness', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    appid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: App, // Relacionamos con App
            key: 'id',
        },
        onDelete: 'NO ACTION',
    },
    bussinessid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Business, // Relacionamos con Bussiness
            key: 'id',
        },
        onDelete: 'NO ACTION',
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
}, {
    tableName: 'appbussiness',
    timestamps: false, // No manejar los campos createdAt y updatedAt
    indexes: [
        {
            name: 'idx_appbussiness_appid',
            fields: ['appid']
        },
        {
            name: 'idx_appbussiness_bussinessid',
            fields: ['bussinessid']
        }
    ]
});

/**
 *  Method for insert in table appbussiness
 * @param {*} data 
 * @returns promise
*/
AppBussiness.saveAppBussiness = async (data) => {
    try {
        const appAppBussiness = await AppBussiness.bulkCreate(data, { 
            // `id` will be auto-generated
            returning: true 
        });
        return AppBussiness;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error; // O puedes manejar el error como prefieras
    } 
}


module.exports = AppBussiness;
