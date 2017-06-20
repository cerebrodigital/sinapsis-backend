import {Router, Request, Response, NextFunction} from "express";
import {default as User, UserModel, AuthToken} from "../models/User";

const router: Router = Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
  User
  .find({})
  .limit(10)
  .select("email profile")
  .exec( (err, users) => {
    if (err) { return next(err); }
    res.json(users);
  });

});


router.get("/ping", (req: Request, res: Response) => {
  res.send( "pong" );
});


export const UserController: Router = router;
