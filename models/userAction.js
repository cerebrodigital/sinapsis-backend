'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserAction = sequelize.define('UserAction', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Count:        DataTypes.INTEGER
  });
  UserAction.associate = function(models) {
    UserAction.belongsTo(models.User)
    UserAction.belongsTo(models.Action)
    UserAction.belongsTo(models.Category)
  }
  return UserAction;
};
