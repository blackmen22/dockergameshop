import { Request, Response, NextFunction } from "express";

export class userController {
  static login(req: Request, res: Response, next: NextFunction) {
    res.json({ user: "success", success: "Login Success!" });
  }

  static registration(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.json({ user: "test", success: "Success!" });
  }
}
