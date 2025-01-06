import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { urlencoded } from 'express';
import userRouter from './router/authRouter.js';
import TransactionRouter from './router/transactionRouter.js';
import categoryAdminRouter from './router/categoryAdminController.js';
import hotelAdminRouter from './router/hotelAdminRouter.js';
import typeAdminRouter from './router/typeAdminController.js';
import placeRouter from './router/placeRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// app.use(function (req, res, next) {
//   res.setHeader("ngrok-skip-browser-warning", true);
//   next()
// })

app.use(cors({ credentials: true }));
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/hotel', hotelAdminRouter);
app.use('/place', placeRouter);
app.use('/category', categoryAdminRouter);
app.use('/type', typeAdminRouter);
app.use('/transaction', TransactionRouter);

app.listen(port, async () => {
  try {
    console.log('Server is running on port '.concat(port));
  } catch (err) {
    console.error(err.message);
  }
});
