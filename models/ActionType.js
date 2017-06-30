'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionType = sequelize.define('ActionType', {
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

  ActionType.allowed_columns  = ["code","name","description"]
  ActionType.required_columns = ["code","name","description"]

  return ActionType;
};