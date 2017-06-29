'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Count:        DataTypes.INTEGER
  });
  Action.associate = function(models) {
    Action.belongsTo(models.User)
    Action.belongsTo(models.Action)
    Action.belongsTo(models.Category)
  }
  return Action;
};
