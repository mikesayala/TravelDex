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

app.post('/api/plans', (req, res, next) => {
  const { planName, date } = req.body;
  if (!planName || !date) {
    throw new ClientError(400, 'planName and date are required fields');
  }
  const insertPlan = `
    insert into "plans" ("planName", "date", "userId")
    values ($1, $2, 1)
    returning "planName", "planId"
  `;
  const params = [planName, date];
  db.query(insertPlan, params)
    .then(result => {
      const [plan] = result.rows;
      res.status(201).json(plan);
    })
    .catch(err => next(err));
});

app.post('/api/activities', (req, res, next) => {
  const { details, activityName } = req.body;
  if (!activityName || !details) {
    throw new ClientError(400, 'activityName and details are required fields');
  }
  const insertActivity = `
    insert into "activities" ("activityName", "details", "planId")
    values ($1, $2, 1)
    returning "activityName", "details", "activityId"
  `;
  const params = [activityName, details];
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
