var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var rootRouter = require('./routes/root');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var models  = require('./models');

var User = models.User

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email})
    .then((user)=>{
      if (!user){
        done(null, false, { message: 'Email not found.'})
      }
      if(!user.validPassword(password)){
        done(null, false, { message: 'Incorrect password.'})
      }
      done(null, user)
    })
    .catch((err)=>{ return done(err) })
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  User.findOne({id:id})
  .then((found)=>{
    return done(null, found)
  })
  .catch((err)=>{
    return done(err)
  })

});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'some secreto' }));
app.use(passport.initialize());
app.use(passport.session());

// mailer
mailer = require('express-mailer');

mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'amorx.ink@gmail.com',
    pass: 'rKngop-df'
  }
});

app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if(req.app.get('env') === 'development'){
    res.status(err.status || 500).json({message: err.message})
  } else {
    res.status(err.status || 500).json({message: "Error, :("})
  }

});

module.exports = app;
