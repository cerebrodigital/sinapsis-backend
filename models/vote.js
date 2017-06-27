'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
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
        Vote.hasOne(models.Comment, {
          foreignKey: "comment_id",
          targetKey: "id"
        }),
        Vote.hasOne(models.Post, {
          foreignKey: "post_id",
          targetKey: "id"
        }),
        Vote.hasOne(models.User, {
          foreignKey: "user_id",
          targetKey: "id"
        })
      }
    }

  });
  return Vote;
};