import Dimension from './dimension';

export default class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension = new Dimension(0,0,0),
    readonly weight: number = 0
  ) {
  }

  get density(): number {
    return this.weight /this.dimension.cubage
  }
}
