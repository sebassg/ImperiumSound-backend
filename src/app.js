import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { registroSonoroRouter } from "./routes/registrosSonoros.js";

import { userController } from "./controllers/usersControllers.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { LoginController } from "./controllers/login.js";
import cookieParser from "cookie-parser";
import { jwtMiddleware } from "./middlewares/jwt.js";
import cors from 'cors'


const allowedOrigins = ['https://htg8q1pp-5173.use.devtunnels.ms', 'http://192.168.1.8:5173', 'https://imperiumsound-movile-production.up.railway.app','https://imperiumsound.site','https://htg8q1pp-5173.use.devtunnels.ms','https://7xpgzwfn-5173.use2.devtunnels.ms'];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solo los orígenes específicos
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true // Permitir el envío de credenciales
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

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
