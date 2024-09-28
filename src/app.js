import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { PORT } from "./config.js";
import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cors from "cors";
import { LoginController } from "./controllers/login.js";

const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(cors())


app.get("/login", LoginController.login) 
 
app.post("/register", userController.create);

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
