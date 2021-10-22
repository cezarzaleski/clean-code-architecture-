import OrderRepository from '../../../domain/repository/order-repository';
import Order from '../../../domain/entity/order';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  save(order: Order): void {
    this.orders.push(order)
  }

  findByCode(code: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve([]);
  }

  count(): Promise<number> {
    return Promise.resolve(this.orders.length);
  }
}
