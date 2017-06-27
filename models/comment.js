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
  }, {
    classMethods: {
      associate: function(models) {
        Comment.hasOne(Comment, {
          foreignKey: "comment_id",
          targetKey: "id"
        }),
        Comment.hasOne(models.Post, {
          foreignKey: "post_id",
          targetKey: "id"
        }),
        Comment.hasOne(models.User, {
          foreignKey: "user_id",
          targetKey: "id"
        })
      }
    }

  });
  return Comment;
};