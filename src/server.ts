/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
// import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
// import * as lusca from "lusca";
import * as dotenv from "dotenv";
// import * as mongo from "connect-mongo"; // (session)
// import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
// import * as passport from "passport";
import expressValidator = require("express-validator");


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Controllers (route handlers).
 */

import { RootController }  from "./controllers/root";
import { UserController }  from "./controllers/user";
import { AuthController }  from "./controllers/auth";

/**
 * API keys and Passport configuration.
 */

import * as passportConfig from "./config/passport";

/**
 * Create Express server.
 */

const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});


/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3003);

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });


// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (!req.user &&
//       req.path !== "/login" &&
//       req.path !== "/signup" &&
//       !req.path.match(/^\/auth/) &&
//       !req.path.match(/\./)) {
//     req.session.returnTo = req.path;
//   } else if (req.user &&
//       req.path == "/account") {
//     req.session.returnTo = req.path;
//   }
//   next();
// });

// should be served by nginx, but left in case not
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

app.use("/",      RootController);
app.use("/users", UserController);
app.use("/auth" , AuthController);

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
  res.status(err.status || 500).json({message: err.message})
});


// app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
