import PlaceOrder from '../../src/application/usecase/place-order';
import PlaceOrderInput from '../../src/application/dto/place-order-input';
import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/database-repository-factory';

let databaseConnection: DatabaseConnection
let placeOrder: PlaceOrder

beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter()
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection))
})

afterAll(async () => {
  await databaseConnection.query("delete from ccca.order_item", [])
  await databaseConnection.query("delete from ccca.order", [])
})

test('Should create place order', async () => {
  //given/when
  const items = new PlaceOrderInput(
    '847.903.332-05',
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
    new Date(),
    "VALE20"
  )



  //then
  const output = await placeOrder.execute(items)
  expect(output.total).toBe(6090)

})
