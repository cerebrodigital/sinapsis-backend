'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    url:    DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true
  });

  return Image;
};