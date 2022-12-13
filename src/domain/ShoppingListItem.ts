export class ShoppingListItem {
  readonly id: number;
  readonly name: string;
  readonly quantity: number;

  constructor(params: { id: number; name: string; quantitity: number }) {
    const { id, name, quantitity } = params;
    this.id = id;
    this.name = name;
    this.quantity = quantitity;
  }
}
