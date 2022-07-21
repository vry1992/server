import express from 'express';
import { init } from './listeners.js';

const initRouter = express.Router();

initRouter.get('/', init);

export { initRouter }