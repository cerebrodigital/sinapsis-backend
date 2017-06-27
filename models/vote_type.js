'use strict';
module.exports = function(sequelize, DataTypes) {
  var VoteType = sequelize.define('VoteType', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return VoteType;
};