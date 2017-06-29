'use strict';
module.exports = function(sequelize, DataTypes) {
  var Permit = sequelize.define('Permit', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  },{
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });
  Permit.associate = function(models) {
    Permit.belongsTo(models.ActionType)
    Permit.belongsTo(models.Category)
  }
  return Permit;
};