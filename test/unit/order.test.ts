import Dimension from '../../src/domain/entity/dimension';
import Order from '../../src/domain/entity/order';
import InvalidCpfError from '../../src/domain/exception/invalid-cpf-error';
import Item from '../../src/domain/entity/item';
import Coupon from '../../src/domain/entity/coupon';
import FreightCalculator from '../../src/domain/service/freight-calculator';


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
  const omega3 = new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault)
  const spirulaItem = new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault)
  order.addItem(omega3, 1, FreightCalculator.calculate(omega3))
  order.addItem(spirulaItem, 1, FreightCalculator.calculate(spirulaItem)
  )
  //then
  expect(order).toBeDefined()
  expect(order.total).toEqual(160)
})

test('Should order with coupon', () => {
  //given/when
  const order = new Order(cpf)
  const omega3Item = new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault)
  const spirulinaItem = new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault)
  order.addItem(omega3Item, 1, FreightCalculator.calculate(omega3Item))
  order.addItem(spirulinaItem, 1, FreightCalculator.calculate(spirulinaItem))
  order.addCoupon(new Coupon('DISCOUNT20', 20, new Date('2030-11-30')))
  //then
  expect(order.total).toEqual(128)
})

test('Should don`t order with coupon expired', () => {
  //given/when
  const order = new Order(cpf)
  const omega3Item = new Item(1, 'suplement', 'Omega 3', 70, dimensionDefault, weightDefault)
  const spirulaItem = new Item(2, 'suplement', 'Spirulina', 90, dimensionDefault, weightDefault)
  order.addItem(omega3Item, 1, FreightCalculator.calculate(omega3Item))
  order.addItem(spirulaItem, 1, FreightCalculator.calculate(spirulaItem))
  order.addCoupon(new Coupon('DISCOUNT20', 20, new Date('2021-09-30')))
  //then
  expect(order.total).toEqual(160)
})

test('Should create order with freight', () => {
  //given/when
  const order = new Order(cpf)
  const guitarraItem = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3)
  const amplificadorItem = new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(100, 50, 50), 20)
  const caboItem = new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 0.9)



  order.addItem(guitarraItem, 1, FreightCalculator.calculate(guitarraItem));
  order.addItem(amplificadorItem, 1, FreightCalculator.calculate(amplificadorItem));
  order.addItem(caboItem, 3, FreightCalculator.calculate(caboItem));
  //then
  const freight = order.getFreight();
  expect(freight).toBe(240)
})
