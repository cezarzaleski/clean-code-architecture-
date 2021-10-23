import PlaceOrderInput from '../../src/application/dto/place-order-input';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/database-repository-factory';
import PlaceOrder from '../../src/application/usecase/place-order';
import GetOrder from '../../src/application/query/get-order';
import OrderDAODatabase from '../../src/infra/dao/order-dao-database';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;


beforeEach(() => {
  const databaseConnection = new DatabaseConnectionAdapter();
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
  const orderDAO = new OrderDAODatabase(databaseConnection);
  getOrder = new GetOrder(orderDAO);

})

test('Should find a order by code', async () => {
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
  const placeOrderOutput = await placeOrder.execute(input);
  const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
  expect(getOrderOutput.total).toBe(4872);

})
