import {
  DEPLOY_STAGE,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} from 'src/config';
import authRouter from 'auth/router';

const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const Sequelize = require('sequelize');

const db = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    schema: DEPLOY_STAGE,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const Test = db.define('tests', {
  value: {
    type: Sequelize.TEXT,
  },
});

const appRouter = express();
appRouter.use((bodyParser.json({ strict: false })));

appRouter.get('/', async (req, res) => res.send('Hello World'));
appRouter.get('/read', async (req, res) => {
  const response = await Test.findAll().map((x) => x.value);
  res.send(response);
});
appRouter.get('/write/:value', async (req, res) => {
  const { value } = req.params;
  await Test.create({ value });

  res.send('all good!');
})

const app = express();
app.use('/app/', appRouter);
app.use('/auth/', authRouter);
export const appService = serverless(app);