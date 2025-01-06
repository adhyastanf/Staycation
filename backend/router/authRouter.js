import { Router } from 'express';
import { loginUser, registerUser, getUser, refreshToken, logoutUser, getAuth, updateUser } from '../controllers/authController.js';
import { authenticateToken } from '../helpers/middleware.js';

const userRouter = Router();

userRouter.post('/login', loginUser)
.post('/register', registerUser)
.get('/logout', logoutUser)
.get('/user', authenticateToken, getUser)
.put('/user', authenticateToken, updateUser)
.post('/refresh-token', refreshToken)
.get('/isAuth', authenticateToken, getAuth);

export default userRouter;
