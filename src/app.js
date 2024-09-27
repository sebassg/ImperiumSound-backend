import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { PORT } from "./config.js";
import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.disable("x-powered-by");
app.use(json());


app.get("/login", (req, res) => {
  res.send("<h1>este es el login</h1>");
});
app.post("/register", userController.create);

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
