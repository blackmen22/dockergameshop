import { Request, Response, NextFunction, Errback } from "express";
import { Order } from "../models/Order";

export class OrderController {
  static placeOrder(req: Request, res: Response, next: NextFunction) {
    const order = new Order(req.body);
    Order.create(order, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "item not ordered", message: err });
      } else {
        res.json({
          status: "success",
          message: "Order was correct",
          data: result._id,
        });
      }
    });
  }

  static getOrderDetails(req: Request, res: Response, next: NextFunction) {
    Order.findById(req.params.orderId, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "I can't show details", message: err });
      } else {
        res.json({ status: "success", message: "Order Founded", data: result });
      }
    });
  }

  static getUserOrders(req: Request, res: Response, next: NextFunction) {
    Order.find({ userId: req.body.userId }, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "I cant't show orders", message: err });
      } else {
        res.json({ status: "success", message: "Orders Founded", data: result });
      }
    });
  }

  static getAllOrders(req: Request, res: Response, next: NextFunction) {
    Order.find({}, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({ status: "checked order fail", message: err });
      } else {
        res.json({ status: "success", message: "Orders Founded", data: result });
      }
    });
  }

  static updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    Order.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          status: req.body.status,
          courierInfo: req.body.courierInfo,
        },
      },
      (err: Errback, result: any) => {
        if (result === null) {
          res.json({
            status: "error",
            message: "Order isn't in stock",
            data: null,
          });
        } else {
          res.json({ status: "success", message: "Order updated", data: null });
        }
      }
    );
  }

  static getDashBoardInfo(req: Request, res: Response, next: NextFunction) {
    Order.find({})
      .sort("-createdOn")
      .limit(10)
      .exec((err, orders) => {
        if (err) {
          res.json({ status: "not ordered", message: err, data: {} });
        } else {
          Order.aggregate(
            [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
            ],
            (err: Errback, result: any) => {
              if (err) {
                res.json({ status: "not added ", message: err, data: {} });
              } else {
                res.json({
                  status: "success",
                  message: "Product added to cart",
                  data: { result, orders },
                });
              }
            }
          );
        }
      });
  }
}
