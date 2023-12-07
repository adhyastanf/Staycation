import express, { urlencoded } from 'express';
import userRouter from './router/authRouter.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', userRouter);

app.listen(port, async () => {
  try {
    console.log('Server is running on port '.concat(port));
  } catch (err) {
    console.error(err.message);
  }
});
