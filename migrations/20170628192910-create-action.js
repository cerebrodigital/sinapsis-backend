'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Actions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Actions');
  }
};