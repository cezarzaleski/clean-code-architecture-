import ItemRepository from '../../domain/repository/item-repository';
import FreightCalculator from '../../domain/service/freight-calculator';
import SimulateFreightInput from '../dto/simulate-freight-input';

export default class SimulateFreightOrder {

  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<any> {
    let freight = 0;
    for (const itemInput of input.items) {
      const item = await this.itemRepository.findById(itemInput.idItem);
      freight += FreightCalculator.calculate(item) * itemInput.quantity;
    }
    return {
      freight: freight
    }

  }
}
