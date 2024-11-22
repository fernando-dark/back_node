'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding an index on the 'appid' and 'methodaccessid' columns
    await queryInterface.addIndex('appmethodaccess', ['appid']);
    await queryInterface.addIndex('appmethodaccess', ['methodaccessid']);
  },
  down: async (queryInterface, Sequelize) => {
    // Removing the indexes in case of rollback
    await queryInterface.removeIndex('appmethodaccess', ['appid']);
    await queryInterface.removeIndex('appmethodaccess', ['methodaccessid']);
  }
};
