import { Router } from 'express';
import { createHotel, deleteHotel, getSingleHotel, updateHotel, viewHotels } from '../controllers/hotelAdminController.js';
import { authenticateToken } from '../helpers/middleware.js';
import upload from '../helpers/upload.js';

const hotelRouter = Router();

hotelRouter.post('/', upload.single('image'), createHotel)
.put('/:productId', upload.single('image'), updateHotel)
.get('/', viewHotels)
.get('/:productId', getSingleHotel)
.delete('/', deleteHotel);

export default hotelRouter;
