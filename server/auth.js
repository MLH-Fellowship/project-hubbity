import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';

import db from './db';

const SECRET = process.env.SECRET || 'sacredsecret';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await db('users')
      .select('id')
      .from('users')
      .where({ email, password: crypto.MD5(password).toString() });

    if (data.length < 1) {
      return res.status(401).send('Invalid credentials!');
    }

    const [{ id }] = data;
    const token = jwt.sign({ id }, SECRET, { algorithm: 'HS256' });

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send('Server-side error: ' + e.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    await db('users').insert({
      email,
      password: crypto.MD5(password).toString(),
    });
    res.send('User registered successfully!');
  } catch (e) {
    console.error(e);
    res.status(500).send('Server-side error: ' + e.message);
  }
};
