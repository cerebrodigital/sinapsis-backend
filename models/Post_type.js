'use strict';
module.exports = function(sequelize, DataTypes) {
  var PostType = sequelize.define('PostType', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    timestamps: false
  });
  return PostType;
};