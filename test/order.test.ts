import Order from '../src/order';
import Item from '../src/item';
import InvalidCpfError from '../src/invalid-cpf-error';
import Coupon from "../src/coupon";
import Dimension from '../src/dimension';

const cpf = '01023312000';
const dimensionDefault = new Dimension(20, 15, 10);
const weightDefault = 10;

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
  order.addItem(
    new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault),
    1
  )
  order.addItem(
    new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault),
    1
  )
  //then
  expect(order).toBeDefined()
  expect(order.total).toEqual(160)
})

test('Should order with coupon', () => {
  //given/when
  const order = new Order(cpf)
  order.addItem(
    new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault),
    1
  )
  order.addItem(
    new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault),
    1
  )
  order.addCoupon(new Coupon('DISCOUNT20', 20, new Date()))
  //then
  expect(order.total).toEqual(128)
})

test('Should don`t order with coupon expired', () => {
  //given/when
  const order = new Order(cpf)
  order.addItem(
    new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault),
    1
  )
  order.addItem(
    new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault),
    1
  )
  order.addCoupon(new Coupon('DISCOUNT20', 20, new Date('2021-09-30')))
  //then
  expect(order.total).toEqual(160)
})

test('Should calculate shipping based on item dimensions', () => {
  //given/when
  const order = new Order(cpf)
  order.addItem(
    new Item(1, 'instrument', 'Camera', 70, dimensionDefault, weightDefault),
    1
  )
  order.addItem(
    new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault),
    1
  )
  //then
  expect(order.total).toEqual(160)
})
