import { ShoppingList } from "../domain/ShoppingList";
import { ShoppingListService } from "../services/ShoppingListService";
import { listData } from "../utils/types";

export const createNewList = async (
  data: listData,
  service: ShoppingListService
) => {
  const list = new ShoppingList({ id: data.id, status: data.status });
  for (const item of data.items) {
    list.addItem(item);
  }
  const savedList = await service.createNewList(list);
  const { id, createdAt, status, items } = savedList;
  const SavedData = {
    id,
    createdAt,
    status,
    items: Array.from(items),
  };
  return SavedData;
};
