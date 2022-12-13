import { ShoppingList } from "../../src/domain/ShoppingList";

describe("Shopping List test", () => {
  it("Should instantiate a default Shopping List", async () => {
    const list = new ShoppingList({});
    expect(list).toBeInstanceOf(ShoppingList);
  });

  it("Should instantiate a Shopping List using params", async () => {
    const list = new ShoppingList({
      id: "5aae8b7b-dd61-4fc1-acd0-ecd484eec8f9",
      createdAt: new Date("12-12-2022"),
    });
    expect(list.id).toBe("5aae8b7b-dd61-4fc1-acd0-ecd484eec8f9");
  });

  it("Should add an item to a Shopping List", async () => {
    const list = new ShoppingList({});
    list.addItem({
      id: 1,
      name: "Café",
      quantity: 1,
    });
    expect(list.items.get(1)?.name).toBe("Café");
  });

  it("Should not add an item to a closed Shopping List", async () => {
    const list = new ShoppingList({});
    list.checkout();
    expect(() =>
      list.addItem({
        id: 2,
        name: "Café",
        quantity: 1,
      })
    ).toThrow("Sorry, this list is already Closed.");
  });

  it("Should not add an item to a canceled Shopping List", async () => {
    const list = new ShoppingList({});
    list.cancel();
    expect(() =>
      list.addItem({
        id: 3,
        name: "Café",
        quantity: 1,
      })
    ).toThrow("Sorry, this list is already Canceled.");
  });
});
