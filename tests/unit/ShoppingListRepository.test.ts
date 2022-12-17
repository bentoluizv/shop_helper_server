import { ShoppingList } from "../../src/domain/ShoppingList";
import { ShoppingListItem } from "../../src/domain/ShoppingListItem";
import { ShoppingListRepository } from "../../src/data/repositories/ShoppingListRepository";
import { PrismaClient } from "@prisma/client";

describe("Shopping List database repository integration test", () => {
  const DB = new PrismaClient();
  const repository = new ShoppingListRepository(DB);
  const list = new ShoppingList({
    id: "5aae8b7b-dd61-4fc1-acd0-ecd484eec8f9",
    createdAt: new Date("12-12-2022"),
  });
  const [café, filtro]: ShoppingListItem[] = [
    { id: 1, name: "Café", quantity: 1 },
    { id: 2, name: "Filtro de Papel", quantity: 1 },
  ];
  list.addItem(café);
  list.addItem(filtro);

  it("Should save an shopping list", async () => {
    const savedList = await repository.save(list);
    expect(savedList.id).toBe(list.id);
  });

  it("Should get an shopping list", async () => {
    const shoppingList = await repository.get(
      "5aae8b7b-dd61-4fc1-acd0-ecd484eec8f9"
    );
    expect(shoppingList).toBeInstanceOf(ShoppingList);
  });

  it("Should delete an shopping list", async () => {
    const list = await repository.delete(
      "5aae8b7b-dd61-4fc1-acd0-ecd484eec8f9"
    );
    expect(list).toBeTruthy();
  });
});
