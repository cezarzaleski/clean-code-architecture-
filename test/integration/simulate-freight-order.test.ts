import PlaceOrderInput from '../../src/application/dto/place-order-input';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import SimulateFreightOrder from '../../src/application/usecase/simulate-freight-order';


test('Should simulate freight order', async () => {
  //given/when
  const items: PlaceOrderInput = {
    cpf: '847.903.332-05',
    orderItems: [
      {
        idItem: 4,
        quantity: 1
      }
    ]
  }

  const placeOrder = new SimulateFreightOrder(new ItemRepositoryMemory())
  //then
  const output = await placeOrder.execute(items)
  expect(output.freight).toBe(30)

})
