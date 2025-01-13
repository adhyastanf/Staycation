import { Router } from 'express';
import { viewHotels, viewSingleHotel } from '../controllers/placeController.js';

const placeRouter = Router();

placeRouter
  .get('/', viewHotels)
  .get('/:slug', viewSingleHotel);

export default placeRouter;
