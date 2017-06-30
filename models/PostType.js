'use strict';
module.exports = function(sequelize, DataTypes) {
  var PostType = sequelize.define('PostType', {
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

  PostType.allowed_columns  = ["code","name","description"]
  PostType.required_columns = ["code","name","description"]

  return PostType;
};