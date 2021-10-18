import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import OrderRepository from '../../src/domain/repository/order-repository';
import OrderRepositoryDatabase from '../../src/infra/repository/database/order-repository-database';
import Order from '../../src/domain/entity/order';
import Item from '../../src/domain/entity/item';
import Dimension from '../../src/domain/entity/dimension';
import FreightCalculator from '../../src/domain/service/freight-calculator';
import FindAllOrders from '../../src/application/usecase/find-all-orders';

let databaseConnection: DatabaseConnection
let orderRepository: OrderRepository
let order: Order
const orders: Order[] = []

beforeAll(async () => {
  databaseConnection = new DatabaseConnectionAdapter()
  orderRepository = new OrderRepositoryDatabase(databaseConnection)
  order = new Order('010.233.120-00', new Date(), 100)
  const guitarraItem = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 50, 15), 3)
  const amplificadorItem = new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(50, 50, 50), 22)
  const caboItem = new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 1)
  order.addItem(guitarraItem, 1, FreightCalculator.calculate(guitarraItem));
  order.addItem(amplificadorItem, 1, FreightCalculator.calculate(amplificadorItem));
  order.addItem(caboItem, 3, FreightCalculator.calculate(caboItem));
  await orderRepository.save(order)

  const order2 = new Order('010.233.120-00', new Date(), 101)
  order2.addItem(guitarraItem, 1, FreightCalculator.calculate(guitarraItem));
  order2.addItem(amplificadorItem, 1, FreightCalculator.calculate(amplificadorItem));
  order2.addItem(caboItem, 3, FreightCalculator.calculate(caboItem));
  await orderRepository.save(order2)
  orders.push(order)
  orders.push(order2)
})

afterAll(async () => {
  await databaseConnection.query("delete from ccca.order_item", [])
  await databaseConnection.query("delete from ccca.order", [])
})



test('Should find all orders', async () => {
  const findAllOrders = new FindAllOrders(orderRepository)
  const orders = await findAllOrders.execute()
  expect(orders).toEqual(orders)
})
