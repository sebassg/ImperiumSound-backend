import { Router } from "express";
import { userController } from "../controllers/usersControllers.js";

const usersRouter = Router()

usersRouter.get("/",userController.getAll)


export { usersRouter };