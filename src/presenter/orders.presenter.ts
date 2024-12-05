import {
  IOrderListQuery,
  IOrderResponseList,
  IOrders,
} from "../interfaces/orders.interface";

export class OrderPresenter {
  public static toPublicResponseDto(orders: IOrders): IOrders {
    return {
      _id: orders._id,
      name: orders.name,
      surname: orders.surname,
      email: orders.email,
      age: orders.age,
      course: orders.course,
      course_format: orders.course_format,
      course_type: orders.course_type,
      status: orders.status,
      phone: orders.phone,
      sum: orders.sum,
      alreadyPaid: orders.alreadyPaid,
      group: orders.group,
      created_at: orders.created_at,
      manager: orders.manager,
      msg: orders.msg,
      utm: orders.utm,
      comment: orders.comment,
    };
  }

  public static toPublicResponseListDto(orders: IOrders[]): IOrders[] {
    return orders.map(OrderPresenter.toPublicResponseDto);
  }

  public static toResponseList(
    data: IOrders[],
    total: number,
    query: IOrderListQuery,
  ): IOrderResponseList {
    return {
      data: data.map((item) => this.toPublicResponseDto(item)),
      total,
      ...query,
    };
  }
}
