import express from 'express';
import { unitRouter } from './routing/unit/index.js';
import { shipRouter } from './routing/ship/index.js';
import { initRouter } from './routing/init/index.js';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/unit', unitRouter);
app.use('/ship', shipRouter);
app.use('/init', initRouter);

app.listen(4000, () => {
  console.log('ok');
})