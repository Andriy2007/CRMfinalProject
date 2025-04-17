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
    } catch (e) {
      next(e);
    }
  }

  public async sendRecoveryLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const recoveryLink = await authService.generateRecoveryLink(userId);
      res.status(200).json({ recoveryLink });
    } catch (e) {
      next(e);
    }
  }

  public async setNewPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      await authService.setNewPassword(token, password);
      res.json({ message: "Password updated successfully" });
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.body;
      if (!refreshToken) {
        return res.status(401).json({message: "Refresh token is required"});
      }
      const {tokens, user} = await authService.refreshToken(refreshToken);
      res.json({tokens, user});
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
