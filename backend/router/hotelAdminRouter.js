import { Router } from 'express';
import { createHotel, deleteHotel, getSingleHotel, updateHotel, viewHotels } from '../controllers/hotelController.js';
import { authenticateToken } from '../helpers/middleware.js';
import upload from '../helpers/upload.js';

const hotelAdminRouter = Router();

hotelAdminRouter.post('/', upload.single('image'), createHotel)
.put('/:productId', upload.single('image'), updateHotel)
.get('/', viewHotels)
.get('/:productId', getSingleHotel)
.delete('/', deleteHotel);

export default hotelAdminRouter;
