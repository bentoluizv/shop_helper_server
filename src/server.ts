import { PrismaClient } from "@prisma/client";
import express from "express";
import { ShoppingListRepository } from "./data/repositories/ShoppingListRepository";
import { ShoppingListService } from "./services/ShoppingListService";
import { createNewList } from "./usecases/createNewList";
import { deleteList } from "./usecases/deleteList";
import { getListById } from "./usecases/getListbyId";

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
  const savedListData = await createNewList(req.body, service);
  res.status(201).json(savedListData);
});

server.get("/list/:id", async (req, res) => {
  const savedListData = await getListById(req.params.id, service);
  res.status(201).json(savedListData);
});

server.delete("/list/:id", async (req, res) => {
  await deleteList(req.params.id, service);
  res.status(204).end();
});

server.listen(PORT, () =>
  console.log(
    `Server is running on ${PORT}, ${new Date().toLocaleDateString()}!!!`
  )
);
