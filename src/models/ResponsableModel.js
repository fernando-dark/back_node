const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Responsable = sequelize.define('responsable', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
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
        tableName: 'responsable',
        timestamps: false, // Evita que Sequelize maneje automáticamente `createdAt` y `updatedAt`
    }
);

Responsable.saveResponsables = async (data) => {
    try {
        const responsableCreate = await Responsable.bulkCreate(data, { 
            returning: true, // Esto devuelve las instancias creadas
        });
        return responsableCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error; // O puedes manejar el error como prefieras
    } 
}

module.exports = Responsable;