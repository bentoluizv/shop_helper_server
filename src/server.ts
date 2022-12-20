import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { ShoppingListRepository } from "./data/repositories/ShoppingListRepository";
import { shoppingListRouter } from "./routes/ShoppingListRoute";
import { ShoppingListService } from "./services/ShoppingListService";

const PORT = process.env.PORT || 3000;
const server = express();

const DB = new PrismaClient();

const repository = new ShoppingListRepository(DB);
const service = new ShoppingListService(repository);

server.use(express.json());
server.use("/", shoppingListRouter(service, express.Router()));
server.use(function (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (e.message === "Post already exists") {
    return res.status(409).send(e.message);
  }
  if (e.message === "Post not found") {
    return res.status(404).send(e.message);
  }
  res.status(500).send(e.message);
});

server.listen(PORT, () =>
  console.log(
    `Server is running on ${PORT}, ${new Date().toLocaleDateString()}!!!`
  )
);
