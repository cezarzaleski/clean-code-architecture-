import Order from '../src/order';
import Item from '../src/item';
import InvalidCpfError from '../src/invalid-cpf-error';
import Coupon from "../src/coupon";

const cpf = '01023312000';

test('Should throw exception cpf first digit invalid', () => {
  expect(() => new Order('01023312099'))
    .toThrow(new InvalidCpfError('01023312099'));
})

test('Should throw exception cpf second digit invalid', () => {
  expect(() => new Order('01023312009'))
    .toThrow(new InvalidCpfError('01023312009'));
})



test('Should order with 3 itens', () => {
  const order = new Order(cpf)
  order.addItem(new Item(1, 'suplement', 'Omega 3', 70), 1)
  order.addItem(new Item(2, 'suplement', 'Spirulina', 90), 1)
  //then
  expect(order).toBeDefined()
  expect(order.total).toEqual(160)
})

test('Should order with coupon', () => {
  //given/when
  const order = new Order(cpf)
  order.addItem(new Item(1, 'suplement', 'Omega 3', 70), 1)
  order.addItem(new Item(2, 'suplement', 'Spirulina', 90), 1)
  order.addCoupon(new Coupon('DISCOUNT20', 20))
  //then
  expect(order.total).toEqual(128)
})