import OrderRepository from '../../domain/repository/order-repository';
import Order from '../../domain/entity/order';


export default class FindAllOrders {

  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll()
  }
}
