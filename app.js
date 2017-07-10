var express = require('express');
var path = require('path');
var jwt  = require('jsonwebtoken')
var flash = require('connect-flash');
var logger =       require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser =   require('body-parser');
var session =      require('express-session')
var cors    =      require('cors')
var middleware =   require('./middleware')
var rootRouter =   require('./routes/root');
var usersRouter =  require('./routes/users');
var actionsRouter =require('./routes/actions');
var authRouter =   require('./routes/auth');
var postsRouter =   require('./routes/posts');
var viewsRouter =   require('./routes/views');
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

    User.findOne({where: {email: email}})
    .catch((err)=>{ return done(err) })
    .then((user)=>{
      if (!user){
        return done(null, false, { message: 'Email not found.'})
      }
      if(!user.validPassword(password)){
        return done(null, false, { message: 'Incorrect password.'})
      }
      return done(null, user)
    })
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  User.findById(id, {include: [models.Profile]})
  .then((found)=>{
    console.log('este es el found', found.id)
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
app.use(flash());

app.use('/api/post_types', simpleCRUDRouter(models,'PostType'))
app.use('/api/vote_types', simpleCRUDRouter(models,'VoteType'))
app.use('/api/action_types', simpleCRUDRouter(models,'ActionType'))
app.use('/api/categories', simpleCRUDRouter(models,'Category'))

app.use('/api/',          rootRouter(models));
app.use('/api/users',     usersRouter(models));
app.use('/api/auth',      authRouter(models));
app.use('/api/posts',     postsRouter(models));
app.use('/api/actions', actionsRouter(models));

app.use('/',              viewsRouter(models));


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
