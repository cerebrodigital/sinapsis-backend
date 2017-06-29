'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Achievements', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      action_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Actions',
          key: 'id'
        },
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id'
        },
      },
      target_count: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Achievements');
  }
};