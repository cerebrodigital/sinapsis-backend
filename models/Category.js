'use strict';
var slug = require('slug')

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  Category.allowed_columns  = ["code","name","description"]
  Category.required_columns = ["code","name","description"]

  Category.hook('beforeValidate', (category, options) => {
    console.log("before validatre", category)
    category.slug = slug(category.name)
  })

  return Category;
};
