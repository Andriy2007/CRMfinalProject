export enum OrderStatusEnum {
  InWork = "InWork",
  New = "New",
  Aggre = "Aggre",
  Disaggre = "Disaggre",
  Dubbing = "Dubbing",
}
export enum OrderCourseEnum {
  FS = "FS",
  QACX = "QACX",
  JCX = "JCX",
  JSCX = "JSCX",
  FE = "FE",
  PCX = "PCX",
}
export enum OrderTypeCourseEnum {
  pro = "pro",
  minimal = "minimal",
  premium = "premium",
  incubator = "incubator",
  vip = "vip",
}
export enum OrderFormatCourseEnum {
  static = "static",
  online = "online",
}
export enum OrderEnum {
  ASC = "asc",
  DESC = "desc",
}
export enum UserListOrderByEnum {
  ID = "_id",
  NAME = "name",
  AGE = "age",
  SURNAME = "surname",
  EMAIL = "email",
  COURSE = "course",
  COURSE_FORMAT = "course_format",
  COURSE_TYPE = "course_type",
  PHONE = "phone",
  SUM = "sum",
  STATUS= "status",
  MANAGER = "manager",
  ALREADYPAID = "alreadyPaid",
  GROUP = "group",
  CREATED_AT = "created_at",
}
