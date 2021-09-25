import { Cpf } from './cpf';


export class Order {
  description: string;
  price: number;
  amount: number;
  cpf: Cpf;
  coupon: number;


  constructor(description: string, price: number, amount: number, cpf: string, coupon: number) {
    this.description = description;
    this.price = price;
    this.amount = amount;
    this.cpf = Cpf.create(cpf);
    this.coupon = coupon;
  }

  get total(): number {
    const total = this.price * this.amount;
    return total - (total*this.coupon);
  }
}
