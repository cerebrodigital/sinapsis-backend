var express = require('express');

var passport = require('passport');
var md5 = require("blueimp-md5");
var uuid = require('node-uuid');
var jwt  = require('jsonwebtoken')
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

/* GET users listing. */
module.exports = function(models){
  const User = models.User
  let router = express.Router();



  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash:     true
    })
  )

  router.get('/logout', (req,res,next)=>{
    req.logout()
    res.redirect('/login');
  })

  router.post('/register', (req, res, next)=>{

    // search if exists
    User.findOne({where: {email: req.body.email}})
    .then(function(user){
      if(user){
        req.flash( 'error', 'Correo existente')
        return res.redirect('/register')

      }else{
        User.create({
          email:    req.body.email,
          name:     req.body.name,
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
              console.log(err)
            }
            req.flash( 'info', 'Email sent')
            res.redirect('/login')
          })
        })
      }
    })


  })
  router.post('/activation', (req, res, next)=>{
    User.findOne({where: {vhash: req.body.vhash}})
    .catch(function(err){return next(err)})
    .then((user)=>{
      if(!user){ next()}
        user.password = md5(req.body.password)
        user.vhash = null
        user.save().then(function(saved){
          req.flash( 'info', 'Activated')
          res.redirect('/login')
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
        req.flash('info', "Email sent if email exists, it does't")
        return res.redirect('/forgot')

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
          req.flash( 'info', 'Email sent if email exists, it does.')
          res.redirect('/forgot')
        })
      })
    })
  })

  return router
}
