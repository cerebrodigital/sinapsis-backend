'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  VoteType.allowed_columns  = ["code","name","description"]
  VoteType.required_columns = ["code","name","description"]

  return Category;
};