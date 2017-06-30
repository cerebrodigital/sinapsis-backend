'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    first_name:     DataTypes.STRING,
    last_name:      DataTypes.STRING,
    job:            DataTypes.STRING,
    city:           DataTypes.STRING,
    state:          DataTypes.STRING,
    country:        DataTypes.STRING,
    phone:          DataTypes.STRING,
    birthdate:      DataTypes.DATEONLY,
    biography:      DataTypes.STRING,
    website:        DataTypes.STRING,
    facebook:       DataTypes.STRING,
    youtube:        DataTypes.STRING,
    instagram:      DataTypes.STRING,
    twitter:        DataTypes.STRING,
    job:            DataTypes.STRING,
    experience:     DataTypes.INTEGER,
    level:          DataTypes.INTEGER,
    action_points:  DataTypes.INTEGER,
    credits:        DataTypes.INTEGER
  }, {
    freezeTableName: true,
    underscored: true
  });

  return Profile;
};