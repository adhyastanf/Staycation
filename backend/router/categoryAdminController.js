import { Router } from 'express';
import { createCategory, updateCategory, viewCategory, deleteCategory } from '../controllers/categoryAdminController.js';
import { authenticateToken } from '../helpers/middleware.js';

const categoryAdminRouter = Router();

categoryAdminRouter
.post('/', createCategory)
.put('/:categoryId', updateCategory)
.get('/', viewCategory)
.delete('/', deleteCategory)


export default categoryAdminRouter;
