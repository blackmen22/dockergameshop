import { Request, Response, NextFunction, Errback } from "express";
import { Category } from "../models/Category";

export class CategoryController {
  static getCategories(req: Request, res: Response, next: NextFunction) {
    Category.find({}, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "category missed", message: err });
      } else {
        res.json({
          status: "success",
          message: "Categories checked",
          data: result,
        });
      }
    });
  }

  static saveCategories(req: Request, res: Response, next: NextFunction) {
    const categories = req.body;
    Category.insertMany(categories, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "fail added", message: err });
      } else {
        res.json({
          status: "success",
          message: "Categories Added!",
          data: result,
        });
      }
    });
  }
}
