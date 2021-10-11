import ValidateCoupon from '../../src/application/usecase/validate-coupon';
import CouponRepositoryMemory from '../../src/infra/repository/memory/coupon-repository-memory';


test('Should validade coupon expire in use case', async () => {
  const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory())
  const output = await validateCoupon.execute('VALE20')
  expect(output.status).toBeFalsy()
})

test('Should validade coupon valid in use case', async () => {
  const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory())
  const output = await validateCoupon.execute('VALE20', new Date('2021-10-01'))
  expect(output.status).toBeTruthy()
})
