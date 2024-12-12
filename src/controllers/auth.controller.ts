import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const data = await authService.signUp(dto);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as { email: string; password: string };
      const data = await authService.signIn(dto);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async sendActivationLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const activationLink = await authService.generateActivationLink(userId);
      res.status(200).json({ activationLink });
    } catch (e) {
      next(e);
    }
  }
  public async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      await authService.setPassword(token, password);
      res.status(200).json({ message: "Password set successfully" });
    } catch (error) {
      next(error);
    }
  }
  public async sendRecoveryLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const recoveryLink = await authService.generateRecoveryLink(userId);
      res.status(200).json({ recoveryLink });
    } catch (error) {
      next(error);
    }
  }
  public async setNewPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;
      await authService.setNewPassword(token, newPassword);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
