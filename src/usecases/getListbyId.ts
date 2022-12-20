import { ShoppingList } from "../domain/ShoppingList";
import { ShoppingListService } from "../services/ShoppingListService";

export const getListById = async (
  uuid: string,
  service: ShoppingListService
) => {
  const { id, createdAt, status, items }: ShoppingList =
    await service.getListById(uuid);

  const savedData = {
    id,
    createdAt,
    status,
    items: Array.from(items),
  };

  return savedData;
};
