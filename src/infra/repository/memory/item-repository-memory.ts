import Item from '../../../domain/entity/item';
import ItemRepository from '../../../domain/repository/item-repository';
import Dimension from '../../../domain/entity/dimension';


export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor () {
    this.items = [
      new Item(1, "Instrumentos Musicais", "Guitarra", 1000),
      new Item(2, "Instrumentos Musicais", "Amplificador", 5000),
      new Item(3, "Instrumentos Musicais", "Cabo", 30),
      new Item(4, "Instrumentos Musicais", "Cabo", 30, new Dimension(100, 30, 10), 3)
    ]
  }

  async findById(idItem: number): Promise<Item> {
    const item = this.items.find(item => item.id === idItem);
    if (!item) throw new Error("Item not found");
    return item;
  }
}
