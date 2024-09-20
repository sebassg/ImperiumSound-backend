import { Router } from "express";
import { userController } from "../controllers/usersControllers.js";

const usersRouter = Router()

usersRouter.get("/",userController.getAll)
usersRouter.post("/",userController.create)

usersRouter.get("/:id",userController.getById)
usersRouter.delete("/:id",userController.delete)
usersRouter.put("/:id",userController.update)

export { usersRouter };