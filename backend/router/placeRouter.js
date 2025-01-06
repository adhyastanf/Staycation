import { Router } from 'express';
import { viewHotels, viewSingleHotel } from '../controllers/placeController.js';
import { authenticateToken } from '../helpers/middleware.js';
import upload from '../helpers/upload.js';

const placeRouter = Router();

placeRouter
  // .post('/', upload.single('image'), createHotel)
  // .put('/:productId', upload.single('image'), updateHotel)
  .get('/', viewHotels)
  .get('/:productId', viewSingleHotel);
// .delete('/', deleteHotel);

export default placeRouter;
