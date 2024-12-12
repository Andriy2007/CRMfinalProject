import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static userName = joi.string().min(3).max(50).trim().messages({});
  private static surName = joi.string().min(3).max(50).trim().messages({});
  private static phone = joi.string().regex(regexConstant.PHONE).trim();
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().trim();
  private static role = joi.string();


  public static create = joi.object({
    name: this.userName,
    surname: this.surName,
    email: this.email.required(),
    password: this.password,
    role: this.role,
  });

  public static update = joi.object({
    name: this.userName,
    surname: this.surName,
    email: this.email,
    password: this.password,
    phone: this.phone,
    role: this.role,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password,
  });
}
