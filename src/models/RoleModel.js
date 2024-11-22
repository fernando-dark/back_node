const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupsso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  func: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true
  },
  personalarea: {
    type: DataTypes.STRING,
    allowNull: true
  },
  personalgroup: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salarygrade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payrolltype: {
    type: DataTypes.STRING,
    allowNull: true
  },
  society: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sso_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false, // Si no tienes createdAt ni updatedAt
  tableName: 'Role'
});

Role.getAllRolls = async () => {
  try {
    const roles = await Role.findAll({
      include: [{
        model: GroupSSO,
        required: true,
        attributes: ['groupsso'], // Seleccionamos solo el campo 'groupsso' de GroupSSO
        as: 'sso_name'
      }]
    });
    return roles; // Devuelve todos los roles con su respectivo 'sso_name'
  } catch (err) {
    throw new Error('Error fetching roles: ' + err.message);
  }
};

Role.addRole = async ({ name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society }) => {
  try {
    const role = await Role.create({
      name,
      groupsso,
      location,
      func,
      section,
      personalarea,
      personalgroup,
      salarygrade,
      payrolltype,
      society
    });
    return role; // Devuelve el rol creado
  } catch (err) {
    throw new Error('Error adding role: ' + err.message);
  }
};

Role.editRole = async ({ name, groupsso, func, id }) => {
  try {
    const role = await Role.update({
      name,
      groupsso,
      func
    }, {
      where: { id },
      returning: true, // Devuelve el registro actualizado
      plain: true // Devuelve un solo objeto, no un array
    });
    return role[1]; // Devuelve el rol actualizado
  } catch (err) {
    throw new Error('Error updating role: ' + err.message);
  }
};

Role.deleteRole = async ({ id }) => {
  try {
    const result = await Role.destroy({
      where: { id },
      returning: true // Devuelve el registro eliminado
    });
    return result; // Si el registro se eliminó correctamente
  } catch (err) {
    throw new Error('Error deleting role: ' + err.message);
  }
};

module.exports = Role;
