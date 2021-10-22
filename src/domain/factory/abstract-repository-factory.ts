import ItemRepository from '../repository/item-repository';
import CouponRepository from '../repository/coupon-repository';
import OrderRepository from '../repository/order-repository';

export default interface AbstractRepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
}
