var express = require('express');
var path = require('path');
var jwt  = require('jsonwebtoken')
var logger =       require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser =   require('body-parser');
var session =      require('express-session')
var cors    =      require('cors')
var middleware =   require('./middleware')
var rootRouter =   require('./routes/root');
var usersRouter =  require('./routes/users');
var authRouter =   require('./routes/auth');
var postsRouter =   require('./routes/posts');
var simpleCRUDRouter =   require('./routes/simpleCRUD');
var models  =      require('./models');

var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/config/config.json')[env];

var User = models.User

//passport

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log(email,password)

    User.findOne({where: { email: email}})
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
  return done(null, user._id);
});

passport.deserializeUser(function(id, done) {

  User.findById(id)
  .then((found)=>{
    return done(null, found)
  })
  .catch((err)=>{
    return done(err)
  })

});

var app = express();

mailer = require('express-mailer');

mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: config.gmailuser,
    pass: config.gmailpassword
  }
});

app.use(cors({
  origin: 'http://localhost:3000'
}))

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

app.use('/post_types', simpleCRUDRouter(models,'PostType'))
app.use('/vote_types', simpleCRUDRouter(models,'VoteType'))
app.use('/action_types', simpleCRUDRouter(models,'ActionType'))
app.use('/categories', simpleCRUDRouter(models,'Category'))

app.use('/',      rootRouter(models));
app.use('/users', usersRouter(models));
app.use('/auth',  authRouter(models));
app.use('/posts', postsRouter(models));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
