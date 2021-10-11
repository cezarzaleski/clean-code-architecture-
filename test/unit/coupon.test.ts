import Coupon from '../../src/domain/entity/coupon';

test('Should validade coupon expired', () => {
  //given/when
  const coupon = new Coupon('OFF20', 20, new Date('2021-09-01'))
  //then
  expect(coupon.isExpired()).toBeTruthy()

})
