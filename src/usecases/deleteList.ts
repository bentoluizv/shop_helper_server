import { ShoppingListService } from "../services/ShoppingListService";

export const deleteList = async (
  uuid: string,
  service: ShoppingListService
) => {
  return await service.deleteList(uuid);
};
