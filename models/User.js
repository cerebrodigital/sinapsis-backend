'use strict';
var md5 = require("blueimp-md5")

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email:    {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: DataTypes.STRING,
    phash:    DataTypes.STRING,
    vhash:    DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true,
    setterMethods: {
      password(pass){ this.setDataValue('phash', md5(pass))}
    }
  });

  User.prototype.validPassword = function(password){
    return this.phash === md5(password)
  }

  User.associate = function(models) {
    User.belongsToMany(models.Badge, {through: 'UserBadge'})
    User.belongsToMany(models.Achievement, {through: 'UserAchievement'})
    User.hasOne(models.Profile)
    User.hasMany(models.CategoryProfile)
  }

  User.allowed_columns  = ["email","username"]
  return User;
};
