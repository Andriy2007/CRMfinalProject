import { NextFunction, Request, Response } from "express";

import { IOrders } from "../interfaces/orders.interface";
import { orderService } from "../services/orders.service";

class OrderController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await orderService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IOrders>;
      const newStudent = await orderService.create(dto);
      res.status(201).json(newStudent);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const order = await orderService.getById(orderId);
      res.json(order);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const dto = req.body as Partial<IOrders>;
      const order = await orderService.updateById(orderId, dto);
      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      await orderService.deleteById(orderId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
