import OrderDto from './order-dto';
import OrderItemDTO from './order-item.dto';

export default interface OrderDAO {
  getOrder(code: string): Promise<OrderDto>
  getOrderItems(idOrder: number): Promise<OrderItemDTO[]>
}
