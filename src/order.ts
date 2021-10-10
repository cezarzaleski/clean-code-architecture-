import Cpf from './cpf';
import Coupon from "./coupon";
import OrderItem from "./order-item";
import Item from "./item";


export default class Order {
  private readonly cpf: Cpf;
  private coupon: Coupon | undefined;
  private readonly orderItems: OrderItem[]
  private freight: number


  constructor(cpf: string) {
    this.cpf = Cpf.create(cpf);
    this.orderItems = []
    this.freight = 0;
  }

  addItem(item: Item, quantity: number) {
    this.freight += item.freight * quantity;
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    const now = new Date()
    if (coupon.effectiveDate >= now) this.coupon = coupon
  }

  get total(): number {
    let total = this.orderItems.reduce(function(total, item) {
      return total + item.getTotal();
    }, 0)
    if (this.coupon) total -= (total * this.coupon.percentage) / 100
    return total
  }

  getFreight () {
    return this.freight;
  }
}
