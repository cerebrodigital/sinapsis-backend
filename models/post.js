'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Post.hasOne(models.PostType, {
          foreignKey: "post_type_id",
          targetKey: "id"
        }),
        Post.hasOne(models.User, {
          foreignKey: "user_id",
          targetKey: "id"
        })
      }
    }

  });

  return Post;
};
