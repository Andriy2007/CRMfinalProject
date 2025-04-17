import joi from "joi";

import { regexConstant } from "../constants/regex.constant";


export class UserValidator {
  private static userName = joi.string().min(2).max(50).trim().messages({});
  private static surName = joi.string().min(2).max(50).trim().messages({});
  private static phone = joi.string().regex(regexConstant.PHONE).trim();
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().trim().messages({});

  public static listQuery = joi.object({
    limit: joi.number().min(1).max(1000).default(4),
    page: joi.number().min(1).default(1),
  });

  public static setPassword = joi.object({
    token: joi.string().required(),
    password: this.password.required(),
    confirmPassword: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
  });

  public static create = joi.object({
    name: this.userName.required(),
    surname: this.surName.required(),
    email: this.email.required(),
    password: this.password,
  });

  public static update = joi.object({
    name: this.userName,
    surname: this.surName,
    email: this.email,
    password: this.password,
    phone: this.phone,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password,
  });
}
