import { NextFunction, Request, Response } from "express";

import {IUser} from "../interfaces/user.interface";
import {userService} from "../services/user.service";
import {User} from "../models/user.model";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await userService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const dto = req.body as Partial<IUser>;
      const user = await userService.updateById(userId, dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { isBanned: true });
      res.status(200).json({ message: "User banned successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to ban user" });
    }
  };

  public async unbanUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { isBanned: false });
      res.status(200).json({ message: "User unbanned successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to unban user" });
    }
  };

}

export const userController = new UserController();
