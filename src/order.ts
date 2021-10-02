import Cpf from './cpf';
import Coupon from "./coupon";
import OrderItem from "./order-item";
import Item from "./item";


export default class Order {
  readonly cpf: Cpf;
  coupon: Coupon | undefined;
  readonly orderItems: OrderItem[]


  constructor(cpf: string) {
    this.cpf = Cpf.create(cpf);
    this.orderItems = []
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon
  }

  get total(): number {
    let total = this.orderItems.reduce(function(total, item) {
      return total + item.getTotal();
    }, 0)
    if (this.coupon) total -= (total * this.coupon.percentage) / 100
    return total
  }
}
