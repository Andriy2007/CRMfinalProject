import { NextFunction, Request, Response } from "express";

import {IUser} from "../interfaces/user.interface";
import {userService} from "../services/user.service";
import {User} from "../models/user.model";
import {RoleEnum} from "../enums/role.enum";


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
      const adminId = res.locals.user._id;
      if (adminId.toString() === id) {
        return res.status(400).json({ message: "You cannot ban yourself" });
      }
      const userToBan = await User.findById(id);
      if (!userToBan) {
        return res.status(404).json({ message: "User not found" });
      }
      if (userToBan.role === RoleEnum.ADMIN) {
        return res.status(403).json({ message: "You cannot ban an admin" });
      }
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
