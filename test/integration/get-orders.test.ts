import PlaceOrderInput from '../../src/application/dto/place-order-input';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/database-repository-factory';
import PlaceOrder from '../../src/application/usecase/place-order';
import GetOrders from '../../src/application/query/get-orders';
import OrderDAODatabase from '../../src/infra/dao/order-dao-database';

let placeOrder: PlaceOrder;
let getOrder: GetOrders;


beforeEach(() => {
  const databaseConnection = new DatabaseConnectionAdapter();
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
  const orderDAO = new OrderDAODatabase(databaseConnection);
  getOrder = new GetOrders(orderDAO);

})

test('Should list all orders', async () => {
  const input = new PlaceOrderInput(
    "847.903.332-05",
    [
      {
        idItem: 1,
        quantity: 1
      },
      {
        idItem: 2,
        quantity: 1
      },
      {
        idItem: 3,
        quantity: 3
      }
    ],
    new Date("2021-03-01"),
    "VALE20"
  );
  await placeOrder.execute(input);
  const getOrderOutput = await getOrder.execute();
  expect(getOrderOutput[0].total).toBe(4872);

})
