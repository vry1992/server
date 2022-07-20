import express from 'express';
import { unitRouter } from './routing/unit/index.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/unit', unitRouter);



app.listen(4000, () => {
  console.log('ok');
})