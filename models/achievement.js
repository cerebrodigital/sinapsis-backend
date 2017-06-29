'use strict';
module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define('Achievement', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: DataTypes.STRING,
    target_count: DataTypes.INTEGER
  });
  Achievement.associate = function(models) {
    Achievement.belongsToMany(models.User, {through: 'UserAchievement'})
    Achievement.belongsToMany(models.Badge, {through: 'BadgeAchievement'} )
  }
  return Achievement;
};
