import PlaceOrder from '../../src/application/usecase/place-order';
import PlaceOrderInput from '../../src/application/dto/place-order-input';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';


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


  const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory())
  //then
  const output = await placeOrder.execute(items)
  expect(output.total).toBe(6090)

})
