import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import {OrderCourseEnum, OrderEnum, OrderFormatCourseEnum, OrderStatusEnum, OrderTypeCourseEnum, UserListOrderByEnum,} from "../enums/order.enum";


export class OrdersValidator {
  private static name = joi.string().min(0).max(15);
  private static surname = joi.string().min(0).max(15);
  private static email = joi.string().regex(regexConstant.EMAIL);
  private static age = joi.string().min(0).max(15);
  private static course = joi.valid(...Object.values(OrderCourseEnum));
  private static course_format = joi.valid(...Object.values(OrderFormatCourseEnum),);
  private static course_type = joi.valid(...Object.values(OrderTypeCourseEnum));
  private static status = joi.valid(...Object.values(OrderStatusEnum));
  private static phone = joi.string().min(0).max(15);
  private static sum = joi.number().min(1000).max(1000000000);
  private static alreadyPaid = joi.string().min(0).max(15);
  private static group = joi.string().min(0).max(15);
  private static created_at = joi.string().min(0).max(15);
  private static manager = joi.string().min(0).max(15);
  private static msg = joi.string().min(0).max(15);
  private static utm = joi.string().min(0).max(15);
  private static comment = joi.string().min(0).max(15);

  public static listQuery = joi.object({
    limit: joi.number().min(1).max(1000).default(20),
    page: joi.number().min(1).default(1),
    searchByName: joi.string().optional(),
    searchBySurname: joi.string().optional(),
    searchByEmail: joi.string().optional(),
    searchByPhone: joi.string().optional(),
    searchByAge: joi.number().optional(),
    course_format: joi
      .string()
      .optional()
      .valid(...Object.values(OrderFormatCourseEnum)),
    course: joi
      .string()
      .optional()
      .valid(...Object.values(OrderCourseEnum)),
    course_type: joi
      .string()
      .optional()
      .valid(...Object.values(OrderTypeCourseEnum)),
    status: joi
      .string()
      .optional()
      .valid(...Object.values(OrderStatusEnum)),
    group: joi
        .string()
        .optional(),
    startDate: joi
        .string()
        .optional(),
    endDate: joi
        .string()
        .optional(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderByEnum))
      .default(UserListOrderByEnum.ID),
  });

  public static create = joi.object({
    name: this.name,
    surname: this.surname,
    email: this.email,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    course_type: this.course_type,
    status: this.status,
    phone: this.phone,
    sum: this.sum,
    alreadyPaid: this.alreadyPaid,
    group: this.group,
    created_at: this.created_at,
    manager: this.manager,
    msg: this.msg,
    utm: this.utm,
    comment: this.comment,
  });

  public static update = joi.object({
    name: this.name,
    surname: this.surname,
    email: this.email,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    course_type: this.course_type,
    status: this.status,
    phone: this.phone,
    sum: this.sum,
    alreadyPaid: this.alreadyPaid,
    group: this.group,
    created_at: this.created_at,
    manager: this.manager,
    msg: this.msg,
    utm: this.utm,
    comment: this.comment,
  });
}
