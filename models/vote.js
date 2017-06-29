'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    content: DataTypes.STRING
  }, {
    classMethods: {

    }

  });

  Vote.associate = function(models) {
    Vote.belongsTo(models.Comment)
    Vote.belongsTo(models.Post)
    Vote.belongsTo(models.VoteType)
    Vote.belongsTo(models.User)
  }
  return Vote;
};