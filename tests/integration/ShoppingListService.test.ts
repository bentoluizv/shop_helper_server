import { PrismaClient } from "@prisma/client";
import { ShoppingListRepository } from "../../src/data/repositories/ShoppingListRepository";
import { ShoppingList } from "../../src/domain/ShoppingList";
import { ShoppingListService } from "../../src/services/ShoppingListService";

describe("Services integration test", () => {
  const DB = new PrismaClient();
  const repository = new ShoppingListRepository(DB);
  const service = new ShoppingListService(repository);
  const list = new ShoppingList({
    id: "5a3c1c3d-7c49-451f-8161-6acf21490dcf",
    createdAt: new Date("10-10-2022"),
  });

  it("Should create a new shopping list", async () => {
    const newList = await service.createNewList(list);
    const savedList = await service.getListById(newList.id);
    expect(newList).toStrictEqual(savedList);
  });

  it("Should delete a shopping list", async () => {
    await service.deleteList(list.id);
    service
      .getListById(list.id)
      .catch((e) => expect(e.message).toBe("List not found!"));
  });
});
