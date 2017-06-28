'use strict';
module.exports = function(sequelize, DataTypes) {
  var Badge = sequelize.define('Badge', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Badge;
};