'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    id:       {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
    },
    content: DataTypes.STRING
  }, {});
  return Comment;
};