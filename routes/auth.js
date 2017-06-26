var express = require('express');
var router = express.Router();
var models  = require('../models');
var passport = require('passport');
var md5 = require("blueimp-md5");
var uuid = require('node-uuid');
var User = models.User

/* GET users listing. */
router.post('/login', function(req, res, next) {
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

router.post('/logout', (req,res,next)=>{
  req.logout()
  res.json({message: 'ok, logged out, successfully :)'})
})

router.post('/register', (req, res, next)=>{
  // search if exists
  User.findOne({where: {email: req.body.email}})
  .then(function(user){
    if(user){
      return res.json({message: 'Email used'})
    }else{
      User.create({
        email:    req.body.email,
        vhash:    uuid.v4()
      }).then(function(saved){
        res.mailer.send('activation_email', {
          to: saved.email,
          subject: 'Activation',
          user:     saved
        }, function (err){
          if(err){
            // handle error
            return next(err)
          }
          return res.json({message: 'Email sent'})
        })
      })
    }
  })
})

router.post('/activation', (req, res, next)=>{
  User.findOne({vhash: req.body.vhash})
  .then((user)=>{
    if(!user){ next()}
      user.password = req.body.password
      user.vhash = null
      user.save().then(function(saved){
        return res.json({message: 'User Activated'})
      })
  })
})

router.post('/forgot', (req,res,next)=>{
  console.log('forgot body', req.body)
  User.findOne({email: req.body.email})
  .then((user)=>{
    console.log('user', user)
    if(!user){
      // flash same as if we did find it
      return res.json({message: "Email sent if email exists, it does't"})
    }
    // we did find the user with the email, set hash and send ativation
    user.vhash = uuid.v4()
    user.save().then(function(saved){
      res.mailer.send('activation_email', {
        to: saved.email,
        subject: 'Activation',
        user:     saved
      }, function (err){
        if(err){
          // handle error
          console.log(err)
        }
        return res.json({message: "Email sent if email exists"})
      })
    })
  })
})

module.exports = router;
