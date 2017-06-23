'use strict';
var md5 = require("blueimp-md5")

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.prototype.validPassword = function(password){
    return this.password === md5(password)
  }

  return User;
};
