// import { Sequelize, TEXT, Model } from 'sequelize';
// import { Model } from 'sequelize-typescript';
import {
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} from './config';

const Sequelize = require('sequelize');

const db = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    schema: 'dev',
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

export const helloFetch = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: (await Test.findAll()).map((x) => x.value),
  }),
});

export const helloCreate = async (event) => {
  const { value } = event.pathParameters;
  await Test.create({ value });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Done',
    }),
  };
};
