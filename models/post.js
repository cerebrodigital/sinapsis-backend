'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title:        DataTypes.STRING,
    tags:         DataTypes.STRING,
    description:  DataTypes.STRING,
    url:          DataTypes.STRING,
  });
  Post.associate = function(models) {
    Post.belongsTo(models.PostType)
    Post.belongsTo(models.User)
    Post.belongsTo(models.Category)
  }
  return Post;
};
