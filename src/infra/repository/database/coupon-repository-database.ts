import CouponRepository from '../../../domain/repository/coupon-repository';
import Coupon from '../../../domain/entity/coupon';
import DatabaseConnection from '../../../infra/database/database-connection';


export default class CouponRepositoryDatabase implements CouponRepository {

  constructor (readonly databaseConnection: DatabaseConnection) {
  }

  async findByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.databaseConnection.query("select * from ccca.coupon where code = $1", [code]);
    if (!couponData) throw new Error("Coupon not found");
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
  }
}
