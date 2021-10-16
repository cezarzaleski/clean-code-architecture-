import ValidateCoupon from '../../src/application/usecase/validate-coupon';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import DatabaseConnection from '../../src/infra/database/database-connection';

let databaseConnection: DatabaseConnection

beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter()
})

test('Should validade coupon expire in use case', async () => {

  const validateCoupon = new ValidateCoupon(new CouponRepositoryDatabase(databaseConnection))
  const output = await validateCoupon.execute('VALE20')
  expect(output.status).toBeFalsy()
})

test('Should validade coupon valid in use case', async () => {
  const validateCoupon = new ValidateCoupon(new CouponRepositoryDatabase(databaseConnection))
  const output = await validateCoupon.execute('VALE20', new Date('2021-10-01'))
  expect(output.status).toBeTruthy()
})
