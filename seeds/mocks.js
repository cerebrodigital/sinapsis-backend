'use strict';
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

module.exports = function(models) {
  models.User.findOrCreate({where: {email: config.admin.email}, defaults: {password: config.admin.password} })
  .spread((user,created)=>{
    if(created){
      console.log('Admin created')
    } else {
      console.log("Admin existed")
    }
  })
}
