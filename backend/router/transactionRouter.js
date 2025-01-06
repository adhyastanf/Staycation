import { Router } from 'express';
import { createTransaction, getAllTransaction, getTransactionById, trxNotif } from '../controllers/transactionController.js';
import { authenticateToken } from '../helpers/middleware.js';

const transactionRouter = Router();

transactionRouter
  .post('/', authenticateToken, createTransaction)
  .get('/', authenticateToken, getAllTransaction)
  .post('/notification', trxNotif)
  .get('/:transaction_id', authenticateToken, getTransactionById)

export default transactionRouter;
