import OrderRepository from '../../domain/repository/order-repository';
import Order from '../../domain/entity/order';


export default class FindOrderByCode {

  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(code: string): Promise<Order> {
    return this.orderRepository.findByCode(code)
  }
}
