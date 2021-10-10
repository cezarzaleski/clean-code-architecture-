import OrderCode from '../../src/domain/entity/order-code';


test('Generate code to order', () => {
  const orderCode = new OrderCode(new Date('2021-10-10'), 1);
  expect(orderCode.value).toBe('202100000001')
})
