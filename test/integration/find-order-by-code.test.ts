import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import FindOrderByCode from '../../src/application/usecase/find-order-by-code';
import OrderRepository from '../../src/domain/repository/order-repository';
import OrderRepositoryDatabase from '../../src/infra/repository/database/order-repository-database';
import Order from '../../src/domain/entity/order';
import Item from '../../src/domain/entity/item';
import Dimension from '../../src/domain/entity/dimension';
import FreightCalculator from '../../src/domain/service/freight-calculator';

let databaseConnection: DatabaseConnection
let orderRepository: OrderRepository
let order: Order

beforeAll(async () => {
  databaseConnection = new DatabaseConnectionAdapter()
  orderRepository = new OrderRepositoryDatabase(databaseConnection)
  order = new Order('010.233.120-00', new Date(), 99)
  const guitarraItem = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 50, 15), 3)
  const amplificadorItem = new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(50, 50, 50), 22)
  const caboItem = new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 1)
  order.addItem(guitarraItem, 1, FreightCalculator.calculate(guitarraItem));
  order.addItem(amplificadorItem, 1, FreightCalculator.calculate(amplificadorItem));
  order.addItem(caboItem, 3, FreightCalculator.calculate(caboItem));
  await orderRepository.save(order)
})

afterAll(async () => {
  const code = '202100000099'
  await databaseConnection.query("delete from ccca.order_item where exists (select 1 from ccca.order where code = $1)", [code])
  await databaseConnection.query("delete from ccca.order where code = $1", [code])
})



test('Should find order by code', async () => {
  const findCorderByCode = new FindOrderByCode(orderRepository)
  const orderFind = await findCorderByCode.execute('202100000099')
  expect(orderFind).toEqual(order)
})
