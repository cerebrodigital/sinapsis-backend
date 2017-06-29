'use strict';
module.exports = function(sequelize, DataTypes) {
  var VoteType = sequelize.define('VoteType', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  VoteType.allowed_columns  = ["code","name"]
  VoteType.required_columns = ["code","name"]

  return VoteType;
};
