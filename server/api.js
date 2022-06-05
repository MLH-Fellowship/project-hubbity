import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import { login, register } from './auth';
import campaigns from './campaigns';

const app = express();

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.use('/campaigns', campaigns);

app.use(express.json({ strict: true }));
app.use('/api', router);

export const api = router;
export const handler = app;
