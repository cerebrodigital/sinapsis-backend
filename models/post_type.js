'use strict';
module.exports = function(sequelize, DataTypes) {
  var PostType = sequelize.define('PostType', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PostType;
};