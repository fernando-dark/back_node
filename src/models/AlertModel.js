const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Role = require('./RoleModel.js');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  useExpiration: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  useRoles: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false, // Si no tienes createdAt ni updatedAt
  tableName: 'Alert'
});

// Relación muchos a muchos con Role (a través de la tabla intermedia AlertRole)
Alert.belongsToMany(Role, {
  through: 'AlertRole', // Nombre de la tabla intermedia
  foreignKey: 'alertId',
  otherKey: 'roleId',
  as: 'roles' // Alias para la relación
});

Alert.createAlert = async ({ priority, message, useExpiration, startDate, endDate, useRoles }) => {
    try {
      const alert = await Alert.create({
        priority,
        message,
        useExpiration,
        startDate,
        endDate,
        useRoles
      });
      return alert.id; // Devuelve el ID de la alerta creada
    } catch (err) {
      throw new Error('Error creating alert: ' + err.message);
    }
};

Alert.getAllAlerts = async () => {
    try {
      const alerts = await Alert.findAll({
        include: {
          model: Role,
          as: 'roles', // Alias definido en la relación
          through: { attributes: [] } // Excluir la tabla intermedia
        }
      });
      return alerts;
    } catch (err) {
      throw new Error('Error fetching alerts: ' + err.message);
    }
};

module.exports = Alert;
