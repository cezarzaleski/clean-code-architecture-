import { Order } from './order';
import { Cpf } from './cpf';


test('Should order with 3 itens', () => {
  //given
  const order = new Order('Test description', 12.8, 12, '01023312000')
  //when
  //then
  expect(order.description).toEqual('Test description')
  expect(order.price).toEqual(12.8)
  expect(order.amount).toEqual(12)
  expect(order.cpf).toEqual(Cpf.create('01023312000'))
})
