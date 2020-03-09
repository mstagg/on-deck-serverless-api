const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const Sequelize = require('sequelize');

const authRouter = express();
authRouter.use((bodyParser.json({ strict: false })));

authRouter.get('/', async (req, res) => res.send('Hello World, this is auth'));

export default authRouter;
