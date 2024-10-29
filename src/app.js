import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { registroSonoroRouter } from "./routes/registrosSonoros.js";

import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { LoginController } from "./controllers/login.js";
import cookieParser from "cookie-parser";
import { jwtMiddleware } from "./middlewares/jwt.js";
import cors from 'cors'

const corsOptions = {
  origin: ['http://localhost:5173','http://192.168.1.8:5173'], 
  credentials: true
};


const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(cors());
app.use(cookieParser())
//app.use(corsMiddleware)

app.use(jwtMiddleware)

app.get("/valid",LoginController.validToken)

app.post("/login", LoginController.login) 

app.get('/logout',LoginController.logout)

app.use('/registrosSonoros',registroSonoroRouter)
 
app.post("/register", userController.create);

app.use("/users", usersRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
