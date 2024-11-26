// subdivisionModel.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const Subdivision = sequelize.define('Subdivision', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    subid: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    sub: {
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
    tableName: 'subdivision',
    timestamps: false,
});

/**
 *  Method for get subdivision
 * @param @none
 * @returns object or string
*/
Subdivision.getBySearch = async function (value) {
    try {
        const results = await Subdivision.findAll({
            where: {
                [Op.or]: [
                    { subid: { [Op.like]: `%${value}%` } },
                    { sub: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a societys:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = Subdivision;