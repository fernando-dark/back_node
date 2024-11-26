// societyModel.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const Society = sequelize.define('Society', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    societyid: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    society: {
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
    tableName: 'society',
    timestamps: false,
});

/**
 *  Method for get society
 * @param @none
 * @returns object or string
*/
Society.getBySearch = async function (value) {
    try {
        const results = await Society.findAll({
            where: {
                [Op.or]: [
                    { societyid: { [Op.like]: `%${value}%` } },
                    { society: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a societys:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = Society;