import Order from '../../domain/entity/order';


export default interface OrderRepository {
    save(order: Order): void;
    findByCode(code: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    count(): Promise<number>;
}
