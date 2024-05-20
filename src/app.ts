import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

//routes


app.get('/', (req: Request, res: Response) =>
  res.send(`Server is running fine!`),
);

export default app;
