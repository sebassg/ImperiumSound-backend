import { Router } from "express";
import { registroSonoroController } from "../controllers/registrosSonoros.js";

const registroSonoroRouter = Router();

registroSonoroRouter.post("/", registroSonoroController.create);
registroSonoroRouter.get('/',registroSonoroController.getAll)
registroSonoroRouter.get('/me',registroSonoroController.getMyRegister)

export { registroSonoroRouter };
