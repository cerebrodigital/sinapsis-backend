'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    type: DataTypes.STRING //(link, video, post, img)
  }, {});

  return Post;
};