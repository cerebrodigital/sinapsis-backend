'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      comment_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Comments',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      post_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('Comments');
  }
};