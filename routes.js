/* eslint-disable import/extensions */

import session from 'telegraf/session.js';
import Stage from 'telegraf/stage.js';

import WizardScene from 'telegraf/scenes/wizard/index.js';
import botSteps from './steps.js';
import addSituation from './sheetsController.js';

const { leave } = Stage;

const router = (bot) => {
  bot.start((ctx) => ctx.reply('Welcome'));

  const sceneFlow = new WizardScene('ABC', ...botSteps);
  sceneFlow.command('cancel', leave());
  sceneFlow.command('aqui', leave());
  sceneFlow.leave((ctx) => {
    addSituation(ctx.session.messages);
    ctx.reply('Muchas gracias! Noticia cargada con exito!');
  });
  sceneFlow.hears('chau', leave());

  const stage = new Stage([sceneFlow], { default: 'ABC' });
  bot.use(session());
  bot.use(stage.middleware());

  bot.hears('Noticia', () => Stage.enter('ABC'));

  bot.launch();
};

export default router;
