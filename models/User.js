'use strict';
var md5 = require("blueimp-md5")
var slug = require("slug")

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
    slug:     DataTypes.STRING,
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

  User.hook('beforeSave', (user, options) => {
    user.slug = slug(user.username)
  })

  User.associate = function(models) {
    User.belongsToMany(models.Badge, {through: 'UserBadge'})
    User.belongsToMany(models.Achievement, {through: 'UserAchievement'})
    User.hasOne(models.Profile)
    User.hasMany(models.CategoryProfile)
    User.hook('afterCreate', (user, options) => {
      models.Profile.findOne({where: {user_id: user.id}})
      .catch( ()=> {throw new Error("Profile can't be created in after create user")})
      .then( profile => {
        if(!profile){
          models.Profile.create({})
          .catch( ()=> {throw new Error("Profile can't be created in after create user")})
          .then(profile =>
            user.setProfile(profile)
          )
        }
      })
    })
  }

  User.allowed_columns  = ["email","username"]
  return User;
};
