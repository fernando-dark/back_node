const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const App = require('./AppModel');
const Responsable = require('./ResponsableModel'); 

const AppResponsable = sequelize.define('appresponsable', {
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
            onDelete: 'NO ACTION', // CASCADE OR NO ACTION
        },
        responsableid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Responsable,
                    key: 'id',
                },
            onDelete: 'NO ACTION', // CASCADE OR NO ACTION
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
        tableName: 'appresponsable',
        timestamps: false, // Evita que Sequelize maneje automáticamente `createdAt` y `updatedAt`
        indexes: [
            {
                name: 'idx_appresponsable_appid',
                fields: ['appid']
            },
            {
                name: 'idx_appresponsable_responsableid',
                fields: ['responsableid']
            }
        ]
    }
);

AppResponsable.saveAppResponsable = async (data) => {
    try {
        const appResponsableCreate = await AppResponsable.bulkCreate(data, { 
            returning: true, // Esto devuelve las instancias creadas
        });
        return appResponsableCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error; // O puedes manejar el error como prefieras
    } 
}


module.exports = AppResponsable;
    