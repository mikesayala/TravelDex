require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/plans', (req, res, next) => {
  const getPlans = `
    select *
      from "plans"
      order by "planId" desc
    `;
  db.query(getPlans)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/activities', (req, res, next) => {
  const act = `
    select *
      from "activities"
      order by "planId"
  `;
  db.query(act)
    .then(result => {
      res.status(200).json(result.rows);

    })
    .catch(err => next(err));
});

app.get('/api/plans/:planId', (req, res, next) => {
  const sql = `
    select *
      from "plans"
      where "planId" = $1
  `;
  const params = [req.params.planId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/plans/:planId/activities', (req, res, next) => {
  const id = req.params.planId;
  const params = [id];
  const getActivities = `
    select "activityName",
           "details",
           "amount"
      from "activities"
      where "planId" = $1
      order by "activityId" asc
  `;
  db.query(getActivities, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/activities/:activityId', (req, res, next) => {
  const idAct = req.params.activityId;
  const params = [idAct];
  const actId = `
    select "activityName",
           "details",
           "activityId",
           "amount",
           "planId"
      from "activities"
     where "activityId" = $1
  `;
  db.query(actId, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/plans', (req, res, next) => {
  const { planName, date, pictureUrl } = req.body;
  if (!planName || !date) {
    throw new ClientError(400, 'planName and date are required fields');
  }
  const insertPlan = `
    insert into "plans" ("planName", "date", "pictureUrl", "userId")
    values ($1, $2, $3, 1)
    returning "planName", "planId", "pictureUrl"
  `;
  const params = [planName, date, pictureUrl];
  db.query(insertPlan, params)
    .then(result => {
      const [plan] = result.rows;
      res.status(201).json(plan);
    })
    .catch(err => next(err));
});

app.post('/api/activities', (req, res, next) => {
  const { details, activityName, amount, planId } = req.body;
  if (!activityName || !details) {
    throw new ClientError(400, 'activityName and details are required fields');
  }
  const insertActivity = `
    insert into "activities" ("activityName", "details", "amount", "planId")
    values ($1, $2, $3, $4)
    returning "activityName", "details", "amount", "activityId"
  `;
  const params = [activityName, details, amount, planId];
  db.query(insertActivity, params)
    .then(result => {
      const [activity] = result.rows;
      res.status(201).json(activity);
    })
    .catch(err => next(err));
});

app.patch('/api/activities/:activityId', (req, res, next) => {
  const { activityName, details, amount } = req.body;
  const activityId = parseInt(req.params.activityId);
  if (!activityName || !details) {
    throw new ClientError(400, 'activityName, and details are required fields');
  }
  const updateActivity = `
      update "activities"
         set "activityName" = $1,
             "details" = $2,
             "amount" = $3
       where "activityId" = $4
       returning *
  `;
  const params = [activityName, details, amount, activityId];
  db.query(updateActivity, params)
    .then(result => {
      const [updatedActivity] = result.rows;
      if (!updatedActivity) {
        res.status(404).json({
          error: `cannot find activity with activityId ${activityId}`
        });
      }
      res.json(updatedActivity);
    })
    .catch(err => next(err));
});

app.delete('/api/activities/:planId', (req, res, next) => {
  const params = [req.params.planId];
  const sql = `
          delete from "activities"
          where "planId" = $1
          returning *
  `;
  db.query(sql, params)
    .then(result => {
      const deletedPlan = result.rows[0];
      res.status(204).json(deletedPlan);
    })
    .catch(err => next(err));
});

app.delete('/api/plans/:planId', (req, res, next) => {
  const params = [req.params.planId];
  const sql = `
          delete from "plans"
          where "planId" = $1
          returning *
  `;
  db.query(sql, params)
    .then(result => {
      const deletedPlan = result.rows[0];
      res.status(204).json(deletedPlan);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
