import OrderRepository from '../../../domain/repository/OrderRepository';
import Order from '../../../domain/entity/order';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  save(order: Order): void {
    this.orders.push(order)
  }
}
