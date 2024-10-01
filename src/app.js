import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { PORT } from "./config.js";
import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { LoginController } from "./controllers/login.js";
import cookieParser from "cookie-parser";
import { jwtMiddleware } from "./middlewares/jwt.js";


const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(cookieParser())
app.use(corsMiddleware())
app.use(jwtMiddleware)



app.get("/login", LoginController.login) 

app.use('/logout',LoginController.logout)
 
app.post("/register", userController.create);

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
