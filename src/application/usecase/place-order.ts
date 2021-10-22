import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import PlaceOrderInput from '../../application/dto/place-order-input';
import Order from '../../domain/entity/order';
import FreightCalculator from '../../domain/service/freight-calculator';
import PlaceOrderOutput from '../../application/dto/place-order-output';
import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import CouponRepository from '../../domain/repository/coupon-repository';

export default class PlaceOrder {
  private readonly itemRepository: ItemRepository
  private readonly orderRepository: OrderRepository
  private readonly couponRepository: CouponRepository

  constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
    this.itemRepository = abstractRepositoryFactory.createItemRepository();
    this.couponRepository = abstractRepositoryFactory.createCouponRepository();
    this.orderRepository = abstractRepositoryFactory.createOrderRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    let sequence = await this.orderRepository.count()
    const order = new Order(input.cpf, input.issueDate, ++sequence)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem)
      order.addItem(item, orderItem.quantity, FreightCalculator.calculate(item))
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      order.addCoupon(coupon);
    }
    this.orderRepository.save(order)
    return new PlaceOrderOutput(order.getCode().value, order.total)
  }
}
