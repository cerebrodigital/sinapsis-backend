'use strict';
module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define('Achievement', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    target_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Achievement.belongsTo(models.Action, {
          foreignKey: "action_id",
          targetKey: "id"
        }),
        Achievement.belongsTo(models.Category, {
          foreignKey: "category_id",
          targetKey: "id"
        })
      }
    }
  });
  return Achievement;
};