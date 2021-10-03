import Dimension from './dimension';

export default class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension,
    readonly weight: number
  ) {
  }
}
