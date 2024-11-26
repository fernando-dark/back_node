// personalArea.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const PersonalArea = sequelize.define('PersonalArea', {
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
    denomination: {
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
    tableName: 'personalarea',
    timestamps: false,
});

/**
 *  Method for get personalarea for like
 * @param @none
 * @returns object or string
*/
PersonalArea.getBySearch = async function (value) {
    try {
        const results = await PersonalArea.findAll({
            where: {
                [Op.or]: [
                    { area: { [Op.like]: `%${value}%` } },
                    { denomination: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a nominas:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = PersonalArea;