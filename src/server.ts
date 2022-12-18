import { PrismaClient } from "@prisma/client";
import express from "express";
import { ShoppingListRepository } from "./data/repositories/ShoppingListRepository";
import { ShoppingList } from "./domain/ShoppingList";
import { ShoppingListItem } from "./domain/ShoppingListItem";
import { ShoppingListService } from "./services/ShoppingListService";
import { Status } from "./utils/types";

const PORT = process.env.PORT || 3000;
const server = express();

const DB = new PrismaClient();

const repository = new ShoppingListRepository(DB);
const service = new ShoppingListService(repository);

server.use("/", express.json());
server.get("/", (_, res) => {
  res.send("Em desenvolvimento!");
});
2;
server.post("/list", async (req, res) => {
  const response: {
    id: string;
    status: Status;
    items: Array<ShoppingListItem>;
  } = req.body;

  const list = new ShoppingList({ id: response.id, status: response.status });

  for (const item of response.items) {
    list.addItem(item);
  }

  const savedData = await service.createNewList(list);
  const { id, createdAt, status, items } = savedData;
  const data = { id, createdAt, status, items: Object.fromEntries(items) };
  res.status(201).json(data);
});

server.listen(PORT, () =>
  console.log(
    `Server is running on ${PORT}, ${new Date().toLocaleDateString()}!!!`
  )
);
