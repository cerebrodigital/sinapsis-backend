'use strict';
module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define('Achievement', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    target_count: DataTypes.INTEGER
  });
  Achievement.associate = function(models) {
    Achievement.belongsTo(models.Action, {through: 'AchievementAction'} )
    Achievement.belongsTo(models.Category)
  }
  return Achievement;
};