import { Router } from 'express';
import { transactionTokenizer } from '../controllers/BankController.js';
// import { authenticateToken } from '../helpers/middleware.js';

const bankRouter = Router();

bankRouter.post('/tokenizer', transactionTokenizer);

export default bankRouter;
