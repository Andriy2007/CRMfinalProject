import { ApiError } from "../errors/api-error";
import { IOrderListQuery, IOrders } from "../interfaces/orders.interface";
import { OrderPresenter } from "../presenter/orders.presenter";
import { orderRepository } from "../repositories/orders.repository";

class OrderService {
  public async getList(query: IOrderListQuery): Promise<any> {
    const [orders, total] = await orderRepository.getList(query);
    return OrderPresenter.toResponseList(orders, total, query);
  }
  public async create(dto: Partial<IOrders>): Promise<IOrders> {
    return await orderRepository.create(dto);
  }
  public async getById(orderId: string): Promise<IOrders> {
    return await this.findOrderOrThrow(orderId);
  }
  public async updateById(orderId: string, dto: Partial<IOrders>,): Promise<IOrders> {
    await this.findOrderOrThrow(orderId);
    return await orderRepository.updateById(orderId, dto);
  }
  public async deleteById(orderId: string): Promise<void> {
    await this.findOrderOrThrow(orderId);
    return await orderRepository.deleteById(orderId);
  }
  private async findOrderOrThrow(orderId: string): Promise<IOrders> {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new ApiError("order not found", 404);
    }
    return order;
  }
}

export const orderService = new OrderService();
