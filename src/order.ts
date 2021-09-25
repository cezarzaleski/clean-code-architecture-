import { Cpf } from './cpf';


export class Order {
  private readonly _description: string;
  private readonly _price: number;
  private readonly _amount: number;
  private readonly _cpf: Cpf;


  constructor(description: string, price: number, amount: number, cpf: string) {
    this._description = description;
    this._price = price;
    this._amount = amount;
    this._cpf = Cpf.create(cpf);
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

  get cpf(): Cpf {
    return this._cpf;
  }
}
