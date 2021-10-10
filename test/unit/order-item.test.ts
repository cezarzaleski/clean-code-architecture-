import OrderItem from '../../src/domain/entity/order-item';


test('Should create new item from order', () => {
  const orderItem = new OrderItem(1, 1000, 2);
  expect(orderItem.getTotal()).toBe(2000)
})
