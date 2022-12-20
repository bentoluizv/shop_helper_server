import { ShoppingListItem } from "@prisma/client";

export type Status = "Open" | "Closed" | "Canceled";

export type listData = {
  id: string;
  status: Status;
  items: Array<ShoppingListItem>;
};
