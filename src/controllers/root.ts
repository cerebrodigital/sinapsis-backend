import {Router, Request, Response, NextFunction} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({message: "Welcome to Sinapsis API!", version: "0.1"});
});



export const RootController: Router = router;
