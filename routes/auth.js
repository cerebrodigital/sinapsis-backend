var express = require('express');
var router = express.Router();
var models  = require('../models');
var passport = require('passport');
var md5 = require("blueimp-md5");
var uuid = require('node-uuid');
var jwt  = require('jsonwebtoken')
var User = models.User

/* GET users listing. */

router.post('/login', function(req, res, next) {
  let email = req.body.email || req.query.email
  let password = req.body.password || req.query.password

  User.findOne({where: {email: email}})
  .catch(err=>{next(err)})
  .then(user=>{
    if(!user){
      return res.status(401).json({message: "wrong credentials"})
    }
    if(!user.validPassword(password)){
      return res.status(401).json({message: "wrong credentials"})
    }
    let payload = {
      id: user.id,
      email: user.email
    }

    let token = jwt.sign(payload, 'some secreto')

    res.json({message: "Authenticated", token: token})
  })
});


router.post('/logout', (req,res,next)=>{
  req.logout()
  res.json({message: 'ok, logged out, successfully :)'})
})

router.get('/register', (req, res, next)=>{
  // search if exists
  User.findOne({where: {email: req.body.email}})
  .catch(function(err){return next(err)})
  .then(function(user){
    if(user){
      return res.json({message: 'Email used'})
    }else{
      User.create({
        email:    req.body.email,
        vhash:    uuid.v4()
      })
      .catch(function(err){return next(err)})
      .then(function(saved){
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
  .catch(function(err){return next(err)})
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
  .catch(function(err){return next(err)})
  .then((user)=>{
    console.log('user', user)
    if(!user){
      // flash same as if we did find it
      return res.json({message: "Email sent if email exists, it does't"})
    }
    // we did find the user with the email, set hash and send ativation
    user.vhash = uuid.v4()
    user.save()
    .catch(function(err){return next(err)})
    .then(function(saved){
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
