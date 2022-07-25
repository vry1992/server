import express from 'express';
import { postShip, postSearchShipByKeyWord, postShipData } from './listeners.js';

const shipRouter = express.Router();

shipRouter.post('/', postShip);
shipRouter.post('/search', postSearchShipByKeyWord);
shipRouter.post('/add-data', postShipData);

export { shipRouter }