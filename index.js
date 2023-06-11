/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import pkg from 'telegraf';
import express from 'express';
import router from './routes.js';

import {} from 'dotenv/config';

const { Telegraf } = pkg;

const config = process.env;
const bot = new Telegraf(config.BOT_TOKEN);

const app = express();

const server = app.listen(8080, () => {
  const host = server.address().address;
  const { port } = server.address();

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/healthz', (_, res) => {
  res.send({
    message: 'OK',
  });
});

router(bot);
