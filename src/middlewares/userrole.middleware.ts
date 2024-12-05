import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (user && user.role === "ADMIN") {
    return next();
  } else {
    res.status(403).send("Доступ заборонено");
  }
}
