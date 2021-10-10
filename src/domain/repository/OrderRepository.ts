import Order from '../../domain/entity/order';


export default interface OrderRepository {
    save(order: Order): void;
}
