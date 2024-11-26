// physicalLocationModel.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const PhysicalLocation = sequelize.define('PhysicalLocation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    divisionid: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    division: {
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
    tableName: 'physicalLocation',
    timestamps: false,
});

/**
 *  Method for get physicalLocation
 * @param @none
 * @returns object or string
*/
PhysicalLocation.getBySearch = async function (value) {
    try {
        const results = await PhysicalLocation.findAll({
            where: {
                [Op.or]: [
                    { divisionid: { [Op.like]: `%${value}%` } },
                    { division: { [Op.like]: `%${value}%` } }
                ]
            }
        });
        return results.map(record => record.get());
    } catch (error) {
        console.error('Error al obtener a societys:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = PhysicalLocation;