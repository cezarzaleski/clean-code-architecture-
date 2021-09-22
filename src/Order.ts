

export default class Order {
  private _description: string;
  private _price: number;
  private _amount: number;


  constructor(description: string, price: number, amount: number) {
    this._description = description;
    this._price = price;
    this._amount = amount;
  }


  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get amount(): number {
    return this._amount;
  }
}
