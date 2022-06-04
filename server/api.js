import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import { login, register } from './auth';

const app = express();

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

app.use(express.json({ strict: true }));
app.use('/api', router);

export const api = router;
export const handler = app;
