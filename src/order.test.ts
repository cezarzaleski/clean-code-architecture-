import { Order } from './order';
import { Cpf } from './cpf';
import { InvalidCpfError } from './invalid-cpf-error';


test('Should throw exception cpf invalid', () => {
  expect(() => new Order('Test description', 12.8, 12, '01023312099'))
    .toThrow(new InvalidCpfError('01023312099'));
})

test('Should throw exception cpf invalid', () => {
  expect(() => new Order('Test description', 12.8, 12, '01023312099'))
    .toThrow(new InvalidCpfError('01023312099'));
})



test('Should order with 3 itens', () => {
  //given/when
  const order = new Order('Test description', 12.8, 12, '01023312000')
  //then
  expect(order.description).toEqual('Test description')
  expect(order.price).toEqual(12.8)
  expect(order.amount).toEqual(12)
  expect(order.cpf).toEqual(Cpf.create('01023312000'))
})
