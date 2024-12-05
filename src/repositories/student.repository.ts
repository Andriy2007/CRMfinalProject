import { FilterQuery, SortOrder } from "mongoose";

import { escapeRegex } from "../constants/regex.constant";
import { UserListOrderByEnum } from "../enums/order.enum";
import { IOrderListQuery, IOrders } from "../interfaces/student.interface";
import { Order } from "../models/student.model";

class OrderRepository {
  public async getList(query: IOrderListQuery): Promise<[IOrders[], number]> {
    console.log("Incoming query:", query);
    const filterObj: FilterQuery<IOrders> = {};
    if (query.searchByName) {
      filterObj.name = { $regex: query.searchByName, $options: "i" };
    }
    if (query.searchBySurname) {
      filterObj.surname = { $regex: query.searchBySurname, $options: "i" };
    }
    if (query.searchByEmail) {
      filterObj.email = { $regex: query.searchByEmail, $options: "i" };
    }
    if (query.searchByPhone) {
      const escapedPhone = escapeRegex(query.searchByPhone);
      filterObj.phone = { $regex: escapedPhone, $options: "i" };
    }
    if (query.searchByAge) {
      filterObj.age = query.searchByAge;
    }
    if (query.course_format) {
      filterObj.course_format = query.course_format;
    }
    if (query.course) {
      filterObj.course = { $regex: query.course, $options: "i" };
    }
    console.log("Filter object:", filterObj); // Додайте логування тут
    if (query.course_type) {
      filterObj.course_type = query.course_type;
    }
    if (query.status) {
      filterObj.status = query.status;
    }
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
    case UserListOrderByEnum.ID:
      sortObj._id = query.order;
      break;
    case UserListOrderByEnum.NAME:
      sortObj.name = query.order;
        break;
    case UserListOrderByEnum.AGE:
      sortObj.age = query.order;
        break;
    case UserListOrderByEnum.SURNAME:
      sortObj.surname = query.order;
      break;
    case UserListOrderByEnum.EMAIL:
      sortObj.email = query.order;
      break;
    case UserListOrderByEnum.COURSE:
      sortObj.course = query.order;
        break;
    case UserListOrderByEnum.COURSE_FORMAT:
      sortObj.course_format = query.order;
      break;
    case UserListOrderByEnum.COURSE_TYPE:
      sortObj.course_type = query.order;
        break;
    case UserListOrderByEnum.PHONE:
      sortObj.phone = query.order;
      break;
      case UserListOrderByEnum.SUM:
      sortObj.sum = query.order;
      break;
    case UserListOrderByEnum.ALREADYPAID:
        sortObj.alreadypaid = query.order;
      break;
    case UserListOrderByEnum.CREATED_AT:
      sortObj.created_at = query.order;
      break;
    case UserListOrderByEnum.GROUP:
      sortObj.group = query.order;
        break;
    default:
      throw new Error("Invalid orderBy");
    }
    const skip = (query.page - 1) * query.limit;
    return await Promise.all([
      Order.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      Order.countDocuments(filterObj),
    ]);
  }

  public async create(dto: Partial<IOrders>): Promise<IOrders> {
    return await Order.create(dto);
  }

  public async getById(orderId: string): Promise<IOrders> {
    return await Order.findById(orderId);
  }

  public async updateById(
    orderId: string,
    dto: Partial<IOrders>,
  ): Promise<IOrders> {
    return await Order.findByIdAndUpdate(orderId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteById(orderId: string): Promise<void> {
    await Order.deleteOne({ _id: orderId });
  }
  public async getByParams(params: Partial<IOrders>): Promise<IOrders> {
    return await Order.findOne(params);
  }
}

export const orderRepository = new OrderRepository();
