import OrderDao from '../../application/query/order-dao';
import OrderDTO from '../../application/query/order-dto';
import DatabaseConnection from '../database/database-connection';
import OrderItemDTO from '../../application/query/order-item.dto';

export default class OrderDAODatabase implements OrderDao {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async getOrder(code: string): Promise<OrderDTO> {
    const [orderData] = await this.databaseConnection.query("select id, code, cpf, freight::float, total::float from ccca.order where code = $1", [code]);
    return orderData;
  }

  async getOrderItems(idOrder: number): Promise<OrderItemDTO[]> {
    return await this.databaseConnection.query("select i.description, oi.quantity, oi.price::float from ccca.order_item oi join ccca.item i on (oi.id_item = i.id) where id_order = $1", [idOrder]);
  }

  async getOrders(): Promise<OrderDTO[]> {
    return await this.databaseConnection.query("select id, code, cpf, freight::float, total::float from ccca.order", []);
  }


}
