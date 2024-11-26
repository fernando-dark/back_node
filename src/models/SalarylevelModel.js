// salarylevelModel.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const Salarylevel = sequelize.define('Salarylevel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    grprof: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    emptype: {
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
    tableName: 'salarylevel',
    timestamps: false,
});

/**
 *  Method for get salary levels 
 * @param @none
 * @returns object or string
*/
Salarylevel.getBySearch = async function (value) {
    try {
        const results = await Salarylevel.findAll({
            where: {
                [Op.or]: [
                    { grprof: { [Op.like]: `%${value}%` } },
                    { emptype: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a societys:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = Salarylevel;