import CouponRepository from '../../../domain/repository/coupon-repository';
import Coupon from '../../../domain/entity/coupon';


export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor () {
    this.coupons = [
      new Coupon("VALE20", 20, new Date("2021-10-10")),
    ]
  }

  async findByCode(code: string): Promise<Coupon> {
    const item = this.coupons.find(item => item.code === code);
    if (!item) throw new Error("Coupon not found");
    return item;
  }
}
