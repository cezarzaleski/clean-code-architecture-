import Cpf from './cpf';
import Coupon from "./coupon";
import OrderItem from "./order-item";
import Item from "./item";
import OrderCode from './order-code';


export default class Order {
  private readonly cpf: Cpf;
  private coupon: Coupon | undefined;
  private readonly orderItems: OrderItem[]
  private freight: number
  private code: OrderCode


  constructor(cpf: string, readonly issueDate: Date = new Date(), readonly sequence: number = 1) {
    this.cpf = Cpf.create(cpf);
    this.orderItems = []
    this.freight = 0;
    this.code = new OrderCode(issueDate, sequence);
  }

  addItem(item: Item, quantity: number, freight: number) {
    this.freight += freight;
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) this.coupon = coupon
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

  getCode () {
    return this.code;
  }

  getCpf () {
    return this.cpf;
  }

  getOrderItems() {
    return this.orderItems
  }

  getCoupon() {
    return this.coupon
  }
}
