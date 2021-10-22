import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import PlaceOrderInput from '../../application/dto/place-order-input';
import Order from '../../domain/entity/order';
import FreightCalculator from '../../domain/service/freight-calculator';
import PlaceOrderOutput from '../../application/dto/place-order-output';

export default class PlaceOrder {


  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem)
      order.addItem(item, orderItem.quantity, FreightCalculator.calculate(item))
    }
    this.orderRepository.save(order)
    return new PlaceOrderOutput(order.getCode().value, order.total)
  }
}
