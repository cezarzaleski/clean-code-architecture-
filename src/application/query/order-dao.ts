import OrderDTO from './order-dto';
import OrderItemDTO from './order-item.dto';

export default interface OrderDAO {
  getOrder(code: string): Promise<OrderDTO>
  getOrders(): Promise<OrderDTO[]>
  getOrderItems(idOrder: number): Promise<OrderItemDTO[]>
}
