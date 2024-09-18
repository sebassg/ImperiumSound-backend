import express, { json } from 'express';
import { usersRouter } from './routes/users.js';

const app = express();
app.use(json());
app.disable('x-powered-by');

// Corrige el orden de req y res
app.get("/", (req, res) => {
  res.json({ message: 'List of users' });
});

app.use("/users", usersRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});