import ItemRepository from '../../domain/repository/item-repository';
import PlaceOrderInput from '../dto/place-order-input';
import Order from '../../domain/entity/order';
import FreightCalculator from '../../domain/service/freight-calculator';

export default class SimulateFreightOrder {

  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: PlaceOrderInput): Promise<any> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem)
      order.addItem(item, orderItem.quantity, FreightCalculator.calculate(item))
    }
    return {
      freight: order.getFreight()
    }

  }
}
