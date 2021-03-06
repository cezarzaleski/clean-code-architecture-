import OrderRepository from '../../../domain/repository/order-repository';
import DatabaseConnection from '../../../infra/database/database-connection';
import Order from '../../../domain/entity/order';
import Item from '../../../domain/entity/item';
import Dimension from '../../../domain/entity/dimension';
import FreightCalculator from '../../../domain/service/freight-calculator';


export default class OrderRepositoryDatabase implements OrderRepository {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async count(): Promise<number> {
    const [data] = await this.databaseConnection.query('select count(1)::int from ccca.order', [])
    return data.count
  }

  async findByCode(code: string): Promise<any> {
    const orderDataItens = await this.databaseConnection.query("select o.*, oi.id_item, i.category, i.description, oi.price," +
      " i.width, i.height, i.length, i.weight, oi.quantity from ccca.order o " +
      " inner join ccca.order_item oi on oi.id_order = o.id" +
      " inner join ccca.item i on i.id = oi.id_item" +
      "  where o.code = $1", [code]);
    if (!orderDataItens) throw new Error("Order not found");
    const [orderData] = orderDataItens
    const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence)
    OrderRepositoryDatabase.converterItem(orderDataItens, order);
    return order
  }

  private static converterItem(orderDataItens: any, order: Order) {
    for (const itemOrder of orderDataItens) {
      if (itemOrder.code === order.getCode().value) {
        const item = new Item(itemOrder.id_item, itemOrder.category, itemOrder.description, parseFloat(itemOrder.price), new Dimension(itemOrder.width, itemOrder.height, itemOrder.length), itemOrder.weight)
        order.addItem(item, itemOrder.quantity, FreightCalculator.calculate(item))
      }
    }
  }

  async save(order: Order): Promise<void> {
    const [orderData] = await this.databaseConnection.query(`insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon, total) values ($1, $2, $3, $4, $5, $6, $7) returning *`, [order.getCode().value, order.getCpf().value, order.issueDate, order.getFreight(), order.sequence, order.getCoupon(), order.total]);
    for (const orderItem of order.getOrderItems()) {
      await this.databaseConnection.query(`
				insert into
					ccca.order_item
				(
					id_order, id_item, price, quantity
				)
				values
				(
					$1, $2, $3, $4
				)
			`,
        [
          orderData.id, orderItem.itemId, orderItem.price, orderItem.quantity
        ]
      )
    }
  }

  async findAll(): Promise<Order[]> {
    const orderDataItens = await this.databaseConnection.query("select o.*, oi.id_item, i.category, i.description, oi.price," +
      " i.width, i.height, i.length, i.weight, oi.quantity from ccca.order o " +
      " inner join ccca.order_item oi on oi.id_order = o.id" +
      " inner join ccca.item i on i.id = oi.id_item order by o.code", []);
    const orders: Array<Order> = []
    if (!orderDataItens) return orders
    for (const itemOrder of orderDataItens) {
      const hasOrderMapper = orders.some(item => item.getCode().value === itemOrder.code)
      if (!hasOrderMapper) {
        const order = new Order(itemOrder.cpf, new Date(itemOrder.issue_date), itemOrder.sequence)
        OrderRepositoryDatabase.converterItem(orderDataItens, order)
        orders.push(order)
      }
    }
    return orders
  }
}
