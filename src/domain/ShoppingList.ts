import { randomUUID } from "crypto";
import { Status } from "../utils/types";
import { ShoppingListItem } from "./ShoppingListItem";

export class ShoppingList {
  readonly items: Map<number, Omit<ShoppingListItem, "id">>;
  private _status: Status;
  readonly id: string;
  readonly createdAt: Date;

  constructor(params: {
    id?: string;
    createdAt?: Date;
    status?: Status;
    items?: Map<number, Omit<ShoppingListItem, "id">>;
  }) {
    const { id, createdAt, status, items } = params;
    id ? (this.id = id) : (this.id = randomUUID());
    createdAt ? (this.createdAt = createdAt) : (this.createdAt = new Date());
    status ? (this._status = status) : (this._status = "Open");
    items
      ? (this.items = items)
      : (this.items = new Map<number, Omit<ShoppingListItem, "id">>());
  }

  get status() {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  cancel() {
    this.status = "Canceled";
  }

  checkout() {
    this.status = "Closed";
  }

  private isOpen() {
    return this.status === "Open" ? true : false;
  }

  addItem(itemToSave: ShoppingListItem) {
    const { id, ...item } = itemToSave;
    if (!this.isOpen())
      throw new Error(`Sorry, this list is already ${this.status}.`);
    const data = this.items.get(id);
    if (data) throw new Error("There is already an item with this ID");
    this.items.set(id, item);
  }
}
