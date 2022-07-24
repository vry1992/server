import express from 'express';
import { postShip, postSearchShipByKeyWord } from './listeners.js';

const shipRouter = express.Router();

shipRouter.post('/', postShip);
shipRouter.post('/search', postSearchShipByKeyWord);

export { shipRouter }