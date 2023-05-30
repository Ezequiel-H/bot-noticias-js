/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import pkg from 'telegraf';
import router from './routes.js';

import {} from 'dotenv/config';

const { Telegraf } = pkg;

const config = process.env;
const bot = new Telegraf(config.BOT_TOKEN);

router(bot);
