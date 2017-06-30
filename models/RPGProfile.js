'use strict';
module.exports = function(sequelize, DataTypes) {
  var RPGProfile = sequelize.define('RPGProfile', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    experience:     DataTypes.INTEGER,
    level:          DataTypes.INTEGER,
    action_points:  DataTypes.INTEGER,
    credits:        DataTypes.INTEGER
  }, {
    freezeTableName: true,
    underscored: true
  });

  return RPGProfile;
};