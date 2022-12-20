import express from "express";
import { PrismaClient } from "@prisma/client";
import { ShoppingListRepository } from "./data/repositories/ShoppingListRepository";
import { shoppingListRouter } from "./routes/ShoppingListRoute";
import { ShoppingListService } from "./services/ShoppingListService";

const PORT = process.env.PORT || 3000;
const server = express();

const DB = new PrismaClient();

const repository = new ShoppingListRepository(DB);
const service = new ShoppingListService(repository);

server.use("/", express.json());
server.use("/", shoppingListRouter(service, express.Router()));

server.listen(PORT, () =>
  console.log(
    `Server is running on ${PORT}, ${new Date().toLocaleDateString()}!!!`
  )
);
