import express from 'express';

import db from './db';
import * as auth from './auth';

const router = express.Router();

router
  .route('/')
  .get(auth.middleware, async (req, res) => {
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

      item.owned = item.user.id === userID;
    }
    return res.json(data);
  })
  .post(auth.middleware, async (req, res) => {
    const userID = req.auth.id;
    try {
      const { title, description } = req.body;
      await db('campaigns').insert({
        title,
        description,
        user_id: userID,
      });
      res.send('Campaign created successfully!');
    } catch (e) {
      console.error(e);
      return res.status(500).send('Server-side error: ' + e.message);
    }
  });

router
  .route('/:id')
  .get(auth.middleware, async (req, res) => {
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

      campaign.owned = campaign.user.id === userID;

      res.json(campaign);
    } catch (e) {
      console.error(e);
      return res.status(404).send("Campaign doesn't exist!");
    }
  })
  .delete(auth.middleware, async (req, res) => {
    const id = +req.params.id;
    const userID = req.auth.id;
    try {
      const [campaign] = await db('campaigns').select('*').where({ id });

      if (campaign == null) {
        return res.send("Campaign doesn't exist!");
      }

      console.log(campaign.user_id, userID);

      if (campaign.user_id !== userID) {
        return res.status(401).send('Campaign not owned!');
      }

      await db('campaigns_votes').delete().where({ campaign_id: id });
      await db('campaigns').delete().where({ id });

      res.send('Campaign successfully deleted!');
    } catch (e) {
      console.error(e);
      return res.status(404).send("Campaign doesn't exist!");
    }
  });

router
  .route('/:id/vote')
  .delete(auth.middleware, async (req, res) => {
    const userID = req.auth.id;
    const id = +req.params.id;
    await db('campaigns_votes').delete().where({
      user_id: userID,
      campaign_id: id,
    });
    res.send('Vote removed succesfully!');
  })
  .post(auth.middleware, async (req, res) => {
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

export default router;
