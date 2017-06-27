'use strict';
var md5 = require("blueimp-md5")

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    email:    DataTypes.STRING,
    username: DataTypes.STRING,
    phash: DataTypes.STRING,
    vhash:    DataTypes.STRING
  }, {
    setterMethods: {
      password(pass){ this.phash = md5(pass) }
    }
  });

  User.prototype.validPassword = function(password){
    return this.phash === md5(password)
  }

  return User;
};
