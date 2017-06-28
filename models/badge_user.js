'use strict';
module.exports = function(sequelize, DataTypes) {
  var BadgeUser = sequelize.define('BadgeUser', {
  }, {
    classMethods: {
      associate: function(models) {
        BadgeUser.belongsTo(models.User, {
          foreignKey: "user_id",
          targetKey: "id"
        }),
        BadgeUser.belongsTo(models.Badge, {
          foreignKey: "badge_id",
          targetKey: "id"
        })
      }
    }
  });
  return BadgeUser;
};