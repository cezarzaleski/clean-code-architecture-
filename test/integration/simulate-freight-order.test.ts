import SimulateFreightInput from '../../src/application/dto/simulate-freight-input';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import SimulateFreightOrder from '../../src/application/usecase/simulate-freight-order';


test('Should simulate freight order', async () => {
  //given/when
  const items: SimulateFreightInput = {
    items: [
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
