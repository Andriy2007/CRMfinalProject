import {
  OrderCourseEnum,
  OrderEnum,
  OrderFormatCourseEnum,
  OrderStatusEnum,
  OrderTypeCourseEnum,
  UserListOrderByEnum,
} from "../enums/order.enum";

export interface IOrders {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: OrderCourseEnum;
  course_format: OrderFormatCourseEnum;
  course_type: OrderTypeCourseEnum;
  status: OrderStatusEnum;
  sum: string;
  alreadyPaid: string;
  created_at: boolean;
  group: string;
  manager: string;
  msg: string;
  utm: string;
  comment: string;
}

export interface IOrderListQuery {
  limit?: number;
  page?: number;
  search?: string;
  course_format?: string;
  course?: string;
  course_type?: string;
  status?: string;
  searchByName?: string;
  searchBySurname?: string;
  searchByEmail?: string;
  searchByPhone?: string;
  searchByAge?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

export interface IOrderResponseList extends IOrderListQuery {
  data: IOrders[];
  total: number;
}

export interface OrderDocument extends IOrders, Document {}
