'use strict';
module.exports = function(sequelize, DataTypes) {
  var Badge = sequelize.define('Badge', {
    id: {
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
      allowNull: false,
    },
    description: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  Badge.associate = function(models) {
    Badge.belongsToMany(models.Achievement, {through: 'BadgeAchievement', timestamps: false})
    Badge.belongsToMany(models.Permit, {through: 'BadgePermit', timestamps: false})
  }
  return Badge;
};