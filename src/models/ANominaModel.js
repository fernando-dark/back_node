// aNominaModel.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const ANomina = sequelize.define('ANomina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    nomina: {
        type: DataTypes.STRING(80),
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
}, {
    tableName: 'anomina',
    timestamps: false,
});

/**
 *  Method for get anominas
 * @param @none
 * @returns object or string
*/
ANomina.getBySearch = async function (value) {
    try {
        const results = await ANomina.findAll({
            where: {
                [Op.or]: [
                    { area: { [Op.like]: `%${value}%` } },
                    { nomina: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a nominas:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = ANomina;