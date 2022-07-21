import express from 'express';
import { postShip } from './listeners.js';

const shipRouter = express.Router();

shipRouter.post('/', postShip);

export { shipRouter }