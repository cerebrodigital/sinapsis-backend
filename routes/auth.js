var express = require('express');
var router = express.Router();
var models  = require('../models');
var passport = require('passport')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  console.log("in get login")
  passport.authenticate('local', function(err,user,info) {
    console.log("loginIn",err, user,info)
    if(err){return next(err)}
    if(!user){ return res.status(401).json({message: "UnAuth"})}
    req.login(user, function(err){
      if(err){ return next(err) }
      return res.json({message: 'ok'})
    })

  })(req,res,next);

});

module.exports = router;
