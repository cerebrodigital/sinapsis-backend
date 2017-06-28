'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('BadgeUsers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      badge_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Badges',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('BadgeUsers');
  }
};