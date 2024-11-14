import { Router } from 'express';
import { createTransaction, getTransaction } from '../controllers/transactionController.js';
import { authenticateToken } from '../helpers/middleware.js';

const transactionRouter = Router();

transactionRouter.post('/', authenticateToken, createTransaction).get('/transaction', getTransaction);

export default transactionRouter;
