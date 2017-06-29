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
      type:DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    target_count: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },{
    timestamps: false
  });
  Achievement.associate = function(models) {
    Achievement.belongsTo(models.ActionType)
    Achievement.belongsTo(models.Category)
  }
  return Achievement;
};