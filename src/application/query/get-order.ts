import OrderDAO from './order-dao';
import GetOrderOutput from '../dto/get-order-output';

export default class GetOrder {


  constructor(readonly orderDAO: OrderDAO) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const orderData = await this.orderDAO.getOrder(code)
    const orderItemsData = await this.orderDAO.getOrderItems(orderData.id)
    return new GetOrderOutput(orderData.code, orderData.cpf, orderItemsData, orderData.freight, orderData.total);
  }
}
