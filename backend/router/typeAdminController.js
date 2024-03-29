import { Router } from 'express';
import { createType, deleteType, updateType, viewType } from '../controllers/typeAdminController.js';

const typeAdminRouter = Router();

typeAdminRouter
.post('/', createType)
.put('/:typeId', updateType)
.get('/', viewType)
.delete('/', deleteType)


export default typeAdminRouter;
