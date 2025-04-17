import { FilterQuery, SortOrder } from "mongoose";

import { escapeRegex } from "../constants/regex.constant";
import { UserListOrderByEnum } from "../enums/order.enum";
import { IOrderListQuery, IOrders } from "../interfaces/orders.interface";
import { Order } from "../models/orders.model";


class OrderRepository {
  public async getList(query: IOrderListQuery): Promise<[IOrders[], number]> {
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
    if (query.course_type) {
      filterObj.course_type = query.course_type;
    }
    if (query.status) {
      if (query.status === "New") {
        filterObj.$or = [{ status: "New" }, { status: null }];
      } else {
        filterObj.status = query.status;
      }
    }
    if (query.group) {
      filterObj.group = query.group;
    }
    if (query.startDate && query.endDate) {
      const start = `${query.startDate}T00:00:00.000Z`;
      const end = `${query.endDate}T23:59:59.999Z`;
      filterObj.created_at = {
        $gte: start,
        $lte: end,
      };
    } else if (query.startDate) {
      filterObj.created_at = {
        $gte: `${query.startDate}T00:00:00.000Z`,
      };
    } else if (query.endDate) {
      filterObj.created_at = {
        $lte: `${query.endDate}T23:59:59.999Z`,
      };
    }

    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const sortObj: { [key: string]: SortOrder } = {};
    if (query.orderBy) {
    switch (query.orderBy) {
    case UserListOrderByEnum.ID:
      sortObj._id = query.order || 'asc';
      break;
    case UserListOrderByEnum.NAME:
      sortObj.name = query.order || 'asc';
        break;
    case UserListOrderByEnum.AGE:
      sortObj.age = query.order || 'asc';
        break;
    case UserListOrderByEnum.SURNAME:
      sortObj.surname = query.order || 'asc';
      break;
    case UserListOrderByEnum.EMAIL:
      sortObj.email = query.order || 'asc';
      break;
    case UserListOrderByEnum.COURSE:
      sortObj.course = query.order || 'asc';
        break;
    case UserListOrderByEnum.COURSE_FORMAT:
      sortObj.course_format = query.order || 'asc';
      break;
    case UserListOrderByEnum.COURSE_TYPE:
      sortObj.course_type = query.order || 'asc';
        break;
    case UserListOrderByEnum.PHONE:
      sortObj.phone = query.order || 'asc';
      break;
      case UserListOrderByEnum.STATUS:
        sortObj.status = query.order || 'asc';
        break;
      case UserListOrderByEnum.MANAGER:
        sortObj.manager = query.order || 'asc';
        break;
      case UserListOrderByEnum.SUM:
      sortObj.sum = query.order || 'asc';
      break;
    case UserListOrderByEnum.ALREADYPAID:
        sortObj.alreadypaid = query.order || 'asc';
      break;
    case UserListOrderByEnum.CREATED_AT:
      sortObj.created_at = query.order || 'asc';
      break;
    case UserListOrderByEnum.GROUP:
      sortObj.group = query.order || 'asc';
        break;
      default:
        throw new Error("Invalid orderBy");
    }
    } else {
      sortObj._id = 'desc';
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

  public async updateById(orderId: string, dto: Partial<IOrders>,): Promise<IOrders> {
    return await Order.findByIdAndUpdate(orderId, dto, {
      returnDocument: "after",
    });
  }
}

export const orderRepository = new OrderRepository();
