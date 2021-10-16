import ItemRepository from '../../../domain/repository/item-repository';
import Item from '../../../domain/entity/item';
import DatabaseConnection from '../../../infra/database/database-connection';
import Dimension from '../../../domain/entity/dimension';


export default class ItemRepositoryDatabase implements ItemRepository {

  constructor (readonly databaseConnection: DatabaseConnection) {
  }

  async findById(idItem: number): Promise<Item> {
    const [itemData] = await this.databaseConnection.query("select * from ccca.item where id = $1", [idItem]);
    if (!itemData) throw new Error("Item not found");
    return new Item(
      itemData.id,
      itemData.category,
      itemData.description,
      parseFloat(itemData.price),
      new Dimension(itemData.width, itemData.height, itemData.length),
      itemData.weight
    );
  }
}
