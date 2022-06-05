import express from 'express';

import db from './db';
import * as auth from './auth';

const router = express.Router();

router.get('/', auth.middleware, async (req, res) => {
  const userID = req.auth.id;
  const data = await db('campaigns').select('*');
  for (const item of data) {
    const [user] = await db('users')
      .select(['id', 'email'])
      .where({ id: item.user_id });
    item.user = user;
    delete item.user_id;

    const [{ count: votes }] = await db('campaigns_votes')
      .count('*')
      .where({ campaign_id: item.id });
    item.votes = +votes;

    const [{ count: supported }] = await db('campaigns_votes')
      .count('*')
      .where({ campaign_id: item.id, user_id: userID });
    item.supported = !!+supported;
  }
  return res.json(data);
});

export default router;
