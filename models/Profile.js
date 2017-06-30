'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    first_name:   DataTypes.STRING,
    last_name:    DataTypes.STRING,
    job:          DataTypes.STRING,
    phone:        DataTypes.STRING,
    biography:    DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true
  });

  return Profile;
};