export default class OrderItem {
  readonly itemId: number
  readonly price: number
  readonly quantity: number


  constructor(itemId: number, price: number, quantity: number) {
    this.itemId = itemId
    this.price = price
    this.quantity = quantity
  }

  getTotal() {
    return this.quantity * this.price
  }
}
