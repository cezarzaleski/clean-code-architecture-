import OrderRepository from '../../../domain/repository/order-repository';
import DatabaseConnection from '../../../infra/database/database-connection';
import Order from '../../../domain/entity/order';


export default class OrderRepositoryDatabase implements OrderRepository {

  constructor (readonly databaseConnection: DatabaseConnection) {}

  async save(order: Order): Promise<void> {
    // begin
    const [orderData] = await this.databaseConnection.query(`
			insert into 
				ccca.order 
			(
				code, cpf, issue_date, freight, sequence, coupon
			) 
			values 
			(
				$1, $2, $3, $4, $5, $6
			) 
			returning *`,
      [
        order.getCode().value,
        order.getCpf().value,
        order.issueDate,
        order.getFreight(),
        order.sequence,
        order.getCoupon()?.code
      ]
    );
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
    // commit
  }
}
