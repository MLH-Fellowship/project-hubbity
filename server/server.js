import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import path from 'path';

import { api } from './api';

const port = parseInt(process.env.PORT, 10) || 8080;

const app = express();

app.use(express.json({ strict: true }));
app.use('/api', api);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
