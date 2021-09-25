import { Order } from './order';


test('Should order with 3 itens', () => {
  //given
  const order = new Order('Test description', 12.8, 12)
  //when
  //then
  expect(order.description).toEqual('Test description')
  expect(order.price).toEqual(12.8)
  expect(order.amount).toEqual(12)
})