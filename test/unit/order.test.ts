import Dimension from '../../src/domain/entity/dimension';
import Order from '../../src/domain/entity/order';
import InvalidCpfError from '../../src/domain/exception/invalid-cpf-error';
import Item from '../../src/domain/entity/item';
import Coupon from '../../src/domain/entity/coupon';


const cpf = '01023312000';
const dimensionDefault = new Dimension(20, 15, 10);
const weightDefault = 1;

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
  order.addCoupon(new Coupon('DISCOUNT20', 20, new Date('2030-11-30')))
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

test('Should create order with freight', () => {
  //given/when
  const order = new Order(cpf)
  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
  order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(100, 50, 50), 20), 1);
  order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 0.9), 3);
  //then
  const freight = order.getFreight();
  expect(freight).toBe(260)
})
