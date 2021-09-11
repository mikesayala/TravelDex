require('dotenv/config');
const express = require('express');
// const uploadsMiddleware = require('./uploads-middleware');
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
      order by "planId"
    `;
  db.query(getPlans)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/activities/', (req, res, next) => {
  const getActivities = `
    select *
      from "activities"
      order by "planId"
  `;
  db.query(getActivities)
    .then(result => {
      res.json(result.rows);
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
  const { details, activityName, planId } = req.body;
  if (!activityName || !details) {
    throw new ClientError(400, 'activityName and details are required fields');
  }
  const insertActivity = `
    insert into "activities" ("activityName", "details", "planId")
    values ($1, $2, $3)
    returning "activityName", "details", "activityId"
  `;
  const params = [activityName, details, planId];
  db.query(insertActivity, params)
    .then(result => {
      const [activity] = result.rows;
      res.status(201).json(activity);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
