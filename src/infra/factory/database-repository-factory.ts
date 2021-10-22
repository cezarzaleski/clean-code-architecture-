import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import CouponRepository from '../../domain/repository/coupon-repository';
import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import DatabaseConnection from '../database/database-connection';
import ItemRepositoryDatabase from '../repository/database/item-repository-database';
import CouponRepositoryDatabase from '../repository/database/coupon-repository-database';
import OrderRepositoryDatabase from '../repository/database/order-repository-database';

export default class DatabaseRepositoryFactory implements AbstractRepositoryFactory {


  constructor(readonly dabaseConnection: DatabaseConnection) {
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.dabaseConnection)
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.dabaseConnection)
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.dabaseConnection)
  }

}
