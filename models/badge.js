'use strict';
module.exports = function(sequelize, DataTypes) {
  var Badge = sequelize.define('Badge', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });

  Badge.associate = function(models) {
    Badge.belongsToMany(models.Achievement, {through: 'BadgeAchievement'})
    Badge.belongsToMany(models.Permit, {through: 'BadgePermit'})
  }
  return Badge;
};