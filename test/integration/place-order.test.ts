import PlaceOrder from '../../src/application/usecase/place-order';
import PlaceOrderInput from '../../src/application/dto/place-order-input';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';
import OrderRepositoryDatabase from '../../src/infra/repository/database/order-repository-database';
import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/databaseconnection-adapter';

let databaseConnection: DatabaseConnection

beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter()
})

test('Should create place order', async () => {
  //given/when
  const items: PlaceOrderInput = {
    cpf: '847.903.332-05',
    orderItems: [
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
    ]

  }


  const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(databaseConnection), new OrderRepositoryDatabase(databaseConnection))
  //then
  const output = await placeOrder.execute(items)
  expect(output.total).toBe(6090)

})
