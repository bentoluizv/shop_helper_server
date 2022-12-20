import { Router } from "express";
import { ShoppingListService } from "../services/ShoppingListService";
import { createNewList } from "../usecases/createNewList";
import { deleteList } from "../usecases/deleteList";
import { getListById } from "../usecases/getListbyId";

export const shoppingListRouter = (
  service: ShoppingListService,
  router: Router
): Router => {
  router.get("/", (_, res) => {
    res.send("Em desenvolvimento!");
  });

  router.post("/list", async (req, res, next) => {
    try {
      const savedListData = await createNewList(req.body, service);
      res.status(201).json(savedListData);
    } catch (e) {
      next(e);
    }
  });

  router.get("/list/:id", async (req, res, next) => {
    try {
      const savedListData = await getListById(req.params.id, service);
      res.status(201).json(savedListData);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/list/:id", async (req, res, next) => {
    try {
      await deleteList(req.params.id, service);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  });

  return router;
};
