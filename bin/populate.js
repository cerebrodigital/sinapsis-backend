#!/usr/bin/env node

/**
 * Module dependencies.
 */
var md5 = require("blueimp-md5")

var models = require("../models");

models.sequelize.sync().then(function () {

  models.User.findOrCreate({where: {email: 'admin@sinapsis.com', password: md5('mafalda')}})
  .spread((user,created)=>{
    if(created){
      console.log('Admin created')
    } else {
      console.log("Admin existed")
    }
  })

});

