import { ShoppingListItem as ItemData } from "@prisma/client";
import { ShoppingListItem } from "../domain/ShoppingListItem";

export const shoppingItemArrayMapping = (shoppingListItem: Array<ItemData>) => {
  const items = shoppingListItem.map(({ id, name, quantity }) => {
    return { id, name, quantity };
  });
  return new Map<number, Omit<ShoppingListItem, "id">>(
    items.map(({ id, ...item }) => [id, item])
  );
};
