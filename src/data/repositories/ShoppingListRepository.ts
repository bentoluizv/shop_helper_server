import { type PrismaClient } from "@prisma/client";
import { ShoppingList } from "../../domain/ShoppingList";
import { shoppingItemArrayMapping } from "../../utils/arrayMapping";
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

    return new ShoppingList({
      id: savedList.id,
      createdAt: savedList.createdAt,
      status: savedList.status as Status,
      items: shoppingItemArrayMapping(savedList.items),
    });
  }

  async get(idToGet: string): Promise<ShoppingList> {
    const data = await this.DB.shoppingList.findFirstOrThrow({
      where: { id: idToGet },
      include: {
        items: true,
      },
    });
    return new ShoppingList({
      id: data.id,
      status: data.status as Status,
      createdAt: data.createdAt,
      items: shoppingItemArrayMapping(data.items),
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
