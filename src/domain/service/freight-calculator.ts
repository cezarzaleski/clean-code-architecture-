import Item from '../entity/item';


export default class FreightCalculator {
  static calculate(item: Item) {
    const freight = 1000 * item.dimension.cubage * (item.density /100)
    return (freight < 10) ? 10: freight
  }
}
