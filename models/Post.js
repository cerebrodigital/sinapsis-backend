'use strict';
var slug = require("slug")

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags:         DataTypes.STRING,
    description:  DataTypes.STRING
  },{
    freezeTableName: true,
    underscored: true
  });


  Post.hook('beforeSave', (post, options) => {
    post.slug = slug(post.title)
  })

  Post.associate = function(models) {
    Post.belongsTo(models.PostType)
    Post.belongsTo(models.User)
    Post.belongsTo(models.Category)
  }


  return Post;
};
