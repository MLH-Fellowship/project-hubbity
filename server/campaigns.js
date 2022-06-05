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

router.get('/:id', auth.middleware, async (req, res) => {
  const id = +req.params.id;
  const userID = req.auth.id;
  try {
    const [campaign] = await db('campaigns').select('*').where({ id });

    const [user] = await db('users')
      .select(['id', 'email'])
      .where({ id: campaign.user_id });
    campaign.user = user;
    delete campaign.user_id;

    const [{ count: votes }] = await db('campaigns_votes')
      .count('*')
      .where({ campaign_id: id });
    campaign.votes = +votes;

    const [{ count: supported }] = await db('campaigns_votes')
      .count('*')
      .where({ campaign_id: id, user_id: userID });
    campaign.supported = !!+supported;

    res.json(campaign);
  } catch (e) {
    console.error(e);
    return res.status(404).send("Campaign doesn't exist!");
  }
});

router.post('/:id', auth.middleware, async (req, res) => {
  const userID = req.auth.id;
  const id = +req.params.id;
  await db('campaigns_votes')
    .insert({
      user_id: userID,
      campaign_id: id,
    })
    .onConflict()
    .ignore();
  res.send('Voted succesfully!');
});

router.delete('/:id', auth.middleware, async (req, res) => {
  const userID = req.auth.id;
  const id = +req.params.id;
  await db('campaigns_votes').delete().where({
    user_id: userID,
    campaign_id: id,
  });
  res.send('Vote removed succesfully!');
});

export default router;
