'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    }
  },{
    freezeTableName: true,
    underscored: true
  }
  );

  Vote.associate = function(models) {
    Vote.belongsTo(models.User)
    Vote.belongsTo(models.Comment)
    Vote.belongsTo(models.Post)
    Vote.belongsTo(models.VoteType)
  }
  return Vote;
};