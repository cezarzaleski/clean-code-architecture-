import { Order } from './order';
import { Cpf } from './cpf';
import { InvalidCpfError } from './invalid-cpf-error';

const price = 12.8;
const amount = 12;
const coupon = 0;
const cpf = '01023312000';
const description = 'Test description';

test('Should throw exception cpf first digit invalid', () => {
  expect(() => new Order(description, price, amount, '01023312099', coupon))
    .toThrow(new InvalidCpfError('01023312099'));
})

test('Should throw exception cpf second digit invalid', () => {
  expect(() => new Order(description, price, amount, '01023312009', coupon))
    .toThrow(new InvalidCpfError('01023312009'));
})



test('Should order with 3 itens', () => {
  const order = new Order(description, price, amount, cpf, coupon)
  //then
  expect(order.description).toEqual(description)
  expect(order.price).toEqual(price)
  expect(order.amount).toEqual(amount)
  expect(order.total).toEqual(price*amount)
  expect(order.cpf).toEqual(Cpf.create(cpf))
})

test('Should order with coupon', () => {
  //given/when
  const order = new Order(description, price, amount, cpf, 10)
  //then
  expect(order.total).toEqual(price*amount)
})
