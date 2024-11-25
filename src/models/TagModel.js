const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Tag = sequelize.define('tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nametag: {
            type: DataTypes.STRING(100),
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
        tableName: 'tag',
        timestamps: false, // Evita que Sequelize maneje automáticamente `createdAt` y `updatedAt`
    }
);

/**
 *  Method for create only one tags
 * @param {*} data 
 * @returns object or string
*/
Tag.saveOnlyTag = async (data) => {
    try {
        const tagCreate = await Tag.create(data);
        return tagCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error;
    } 
}

/**
 *  Method for create massive tags
 * @param {*} data 
 * @returns object or string
*/
Tag.saveCreateTag = async (data) => {
    try {
        const tagCreate = await Tag.bulkCreate(data, { 
            returning: true, // Esto devuelve las instancias creadas
        });
        return tagCreate;
    } catch (error) {
        console.error('Error al guardar los datos', error);
        throw error;
    } 
}

/**
 *  Method for get tags
 * @param {*} data 
 * @returns object or string
*/
Tag.getAllTags = async function () {
    try {
        const tags = await Tag.findAll();
        return tags.map(tag => tag.get()); // Mapear los resultados para devolver un array de objetos
    } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
        throw error; // O puedes manejar el error como prefieras
    }
}

module.exports = Tag;