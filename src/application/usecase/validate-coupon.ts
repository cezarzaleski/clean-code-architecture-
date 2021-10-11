import CouponRepository from '../../domain/repository/coupon-repository';

export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string, today = new Date()): Promise<any> {
    const coupon = await this.couponRepository.findByCode(code)
    return {
      status: !coupon.isExpired(today)
    }
  }
}
