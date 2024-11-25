// appMethodAccessModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const App = require('./AppModel'); // Importamos App
const MethodAccess = require('./MethodAccessModel'); // Importamos MethodAccess

const AppMethodAccess = sequelize.define('AppMethodAccess', {
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
    methodaccessid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MethodAccess, // Relacionamos con MethodAccess
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
    tableName: 'appmethodaccess',
    timestamps: false, // No manejar los campos createdAt y updatedAt
    indexes: [
        {
            name: 'idx_appmethodaccess_appid',
            fields: ['appid']
        },
        {
            name: 'idx_appmethodaccess_methodaccessid',
            fields: ['methodaccessid']
        }
    ]
});

/**
 *  Method for insert in table appmethodaccess
 * @param {*} data 
 * @returns promise
*/
AppMethodAccess.saveAppMethodAccesss = async (data) => {
    try {
        const appMethodAccessCreate = await AppMethodAccess.bulkCreate(data, { 
            // `id` will be auto-generated
            returning: true 
        });
        return appMethodAccessCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error; // O puedes manejar el error como prefieras
    } 
}


module.exports = AppMethodAccess;
