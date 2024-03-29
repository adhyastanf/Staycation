import { Router } from 'express';
import { loginUser, registerUser, getUser, refreshToken, logoutUser } from '../controllers/authController.js';
import { authenticateToken } from '../helpers/middleware.js';

const userRouter = Router();

userRouter.post('/login', loginUser).post('/register', registerUser).get('/logout', logoutUser).get('/user', authenticateToken, getUser).get('/refresh', refreshToken);

export default userRouter;
