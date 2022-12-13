import { type PrismaClient } from "@prisma/client";
import { ShoppingList } from "../../domain/ShoppingList";
import { ShoppingListItem } from "../../domain/ShoppingListItem";
import { Status } from "../../utils/types";
import { Repository } from "../Repository";

export class ShoppingListRepository implements Repository<ShoppingList> {
  constructor(private DB: PrismaClient) {}
  async save(list: ShoppingList): Promise<ShoppingList> {
    const savedList = await this.DB.shoppingList.create({
      data: {
        id: list.id,
        createdAt: list.createdAt,
        status: list.status,
        items: {
          createMany: { data: Array.from(list.items.values()) },
        },
      },
      include: {
        items: true,
      },
    });

    const items = savedList.items.map(({ id, name, quantity }) => {
      return { id, name, quantity };
    });
    const mappedItems = new Map<number, Omit<ShoppingListItem, "id">>(
      items.map(({ id, ...item }) => [id, item])
    );

    return new ShoppingList({
      id: savedList.id,
      createdAt: savedList.createdAt,
      status: savedList.status as Status,
      items: mappedItems,
    });
  }
  get(id: string): Promise<ShoppingList> {
    throw new Error("Method not implemented.");
  }
}
