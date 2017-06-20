import {Router, Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import {default as User, UserModel, AuthToken} from "../models/User";
const request = require("express-validator");

const router: Router = Router();

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  // TODO validate params
  // req.assert("email", "Email is not valid").isEmail();
  // req.assert("password", "Password cannot be blank").notEmpty();
  // req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  // const errors = req.validationErrors();
  // if (errors) {
  //   return res.status(400).json({errors: errors});
  // }
// TODO up
  const email = req.body.email || req.query.email;
  const password = req.body.password || req.query.password;

  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({ message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return next(err); }
      if (isMatch) {
        const payload = {id: user.id};
        const token =  jwt.sign(payload, "serevro dijital");
        return res.json({message: "ok", token: token});
      }
      return res.json( { message: "Invalid email or password." });
    });
  });

});


export const AuthController: Router = router;
