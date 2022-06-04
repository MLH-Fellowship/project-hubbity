import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

const app = express();

const router = express.Router();

router.get('/', (req, res) => res.send('Hi'));

app.use('/api/*', router);

export const handler = app;
