'use strict';
module.exports = function(sequelize, DataTypes) {
  var CategoryProfile = sequelize.define('CategoryProfile', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    experience:     DataTypes.INTEGER,
    level:          DataTypes.INTEGER,
    action_points:  DataTypes.INTEGER
  }, {
    freezeTableName: true,
    underscored: true
  });

  CategoryProfile.associate = function(models) {
    CategoryProfile.belongsTo(models.User)
    CategoryProfile.belongsTo(models.Category)
  }

  return CategoryProfile;
};