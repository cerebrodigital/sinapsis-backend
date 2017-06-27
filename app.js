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

var app = express();

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
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({ secret: 'some secreto' }));
//app.use(passport.initialize());
//app.use(passport.session());

// mailer
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

app.use(middleware.hasToken());

app.use('/',      rootRouter(models));
app.use('/users', usersRouter(models));
app.use('/auth',  authRouter(models));
app.use('/posts', postsRouter(models));
app.use('/post_types', simpleCRUDRouter(models,'PostType'))
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
