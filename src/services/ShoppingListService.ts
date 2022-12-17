import { ShoppingListRepository } from "../data/repositories/ShoppingListRepository";
import { ShoppingList } from "../domain/ShoppingList";

export class ShoppingListService {
  constructor(private repository: ShoppingListRepository) {}
  async createNewList(list: ShoppingList) {
    const existingList = await this.repository.get(list.id);
    if (existingList) throw new Error("List already exists!");

    return await this.repository.save(list);
  }
  async getListById(id: string): Promise<ShoppingList> {
    const list = await this.repository.get(id);
    if (!list) throw new Error("List not found!");

    return list;
  }
  async deleteList(id: string) {
    const list = await this.getListById(id);
    return await this.repository.delete(list.id);
  }
}
