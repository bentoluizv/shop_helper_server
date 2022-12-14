import { type PrismaClient } from "@prisma/client";
import { ShoppingList } from "../../domain/ShoppingList";
import { arrayToMap } from "../../utils/arrayMapping";
import { Status } from "../../utils/types";
import { Repository } from "../Repository";

export class ShoppingListRepository implements Repository<ShoppingList> {
  constructor(private DB: PrismaClient) {}

  async get(idToGet: string): Promise<ShoppingList | undefined> {
    const data = await this.DB.shoppingList.findUnique({
      where: { id: idToGet },
      include: {
        items: true,
      },
    });
    if (!data) return;
    return new ShoppingList({
      id: data.id,
      status: data.status as Status,
      createdAt: data.createdAt,
      items: arrayToMap(data.items),
    });
  }

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

    return new ShoppingList({
      id: savedList.id,
      createdAt: savedList.createdAt,
      status: savedList.status as Status,
      items: arrayToMap(savedList.items),
    });
  }

  async delete(idToDelete: string): Promise<string> {
    const { id } = await this.DB.shoppingList.delete({
      where: {
        id: idToDelete,
      },
      select: { id: true },
    });
    return id;
  }
}
