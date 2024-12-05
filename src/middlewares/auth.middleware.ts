import { NextFunction, Request, Response } from "express";

import {ApiError} from "../errors/api-error";
import {tokenRepository} from "../repositories/token.repository";
import {passwordService} from "../services/password.service";
import {tokenService} from "../services/token.service";
import {userService} from "../services/user.service";

class AuthMiddleware {
  public async checkCredentials(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Email або пароль не надані");
      }
      const user = await userService.getByEmail(email);
      if (!user) {
        return res.status(401).send("Неправильний email або пароль");
      }
      const isPasswordValid = await passwordService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Неправильний email або пароль");
      }
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAccessToken(req: Request, res: Response, next: NextFunction,) {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }
      const payload = tokenService.checkToken(accessToken);
      const tokenPair = await tokenRepository.findByParams({ accessToken });
      if (!tokenPair) {
        throw new ApiError("Invalid token", 401);
      }
      const user = await userService.getById(String(payload.userId));
      if (!user || !user._id) {
        throw new ApiError("User not authenticated or missing _id", 401);
      }
      req.res.locals.jwtPayload = payload;
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
