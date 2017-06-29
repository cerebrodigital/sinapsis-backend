'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    content: DataTypes.STRING
  });
  Comment.associate = function(models) {
    Comment.belongsTo(Comment),
    Comment.belongsTo(models.Post),
    Comment.belongsTo(models.User)
  }
  return Comment;
};