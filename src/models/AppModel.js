// appModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const App = sequelize.define('App', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    imageurlapp: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    nameapp: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descriptionapp: {
        type: DataTypes.STRING(800),
        allowNull: true,
    },
    statusapp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    urlapp: {
        type: DataTypes.STRING(800),
        allowNull: true,
    },
    bussines: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
    tableName: 'app',
    timestamps: false, // No manejar los campos createdAt y updatedAt
});

/**
 *  Method for insert in table
 * @param {*} data 
 * @returns object or string
*/
App.addApp = async function (data) {
    try {
      const newApp = await this.create(data);
      return newApp;
    } catch (error) {
      return `Error al crear el registro: ${error.message}`;
    }
};

module.exports = App;
