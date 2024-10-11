import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { registroSonoroRouter } from "./routes/registrosSonoros.js";
import { PORT } from "./config.js";
import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { LoginController } from "./controllers/login.js";
import cookieParser from "cookie-parser";
import { jwtMiddleware } from "./middlewares/jwt.js";
import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:5173', // La URL de tu cliente React
  credentials: true, // Permitir el envío de cookies
};


const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(cors(corsOptions));
app.use(cookieParser())
//app.use(corsMiddleware)

app.use(jwtMiddleware)

app.get("/valid",LoginController.validToken)

app.post("/login", LoginController.login) 

app.get('/logout',LoginController.logout)

app.use('/registrosSonoros',registroSonoroRouter)
 
app.post("/register", userController.create);

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
