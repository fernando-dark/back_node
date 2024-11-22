const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const App = require('./AppModel');
const Tag = require('./TagModel'); 

const Apptags = sequelize.define('apptags', {
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
            model: App, 
            key: 'id',
        },
        onDelete: 'NO ACTION', 
    },
    tagid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tag,
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
    tableName: 'apptags',
    timestamps: false, // No automatic `createdAt` and `updatedAt` columns
    indexes: [
        {
            name: 'idx_apptags_appid',
            fields: ['appid']
        },
        {
            name: 'idx_apptags_tagid',
            fields: ['tagid']
        }
    ]
});

Apptags.saveAppTags = async (data) => {
    try {
        const appTagsCreate = await Apptags.bulkCreate(data, { 
            // `id` will be auto-generated
            returning: true 
        });
        return appTagsCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error; // O puedes manejar el error como prefieras
    } 
}

module.exports = Apptags;