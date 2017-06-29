'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code:        DataTypes.STRING,
    name:        DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false
  });
  return Action;
};