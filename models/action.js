'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Action;
};