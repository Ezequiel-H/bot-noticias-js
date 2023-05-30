/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
const DESCRIPTION = 1;
const RESOLUTION = 2;
const OBSERVATIONS = 3;
const TEXTS_FOR_RESPONSES = [
  'Mensaje Inicial',
  'Descripcion',
  'Resolucion',
  'Observaciones',
  'TODAS LAS FOTOS y si deseas terminar presiona /aqui',
  'las fotos, si deseas terminar presiona /aqui',
];
const thanksMessage = 'Muchas gracias por mandar';
const askNextMessage = 'por favor envia';

const getReplyMessage = (step) => `${thanksMessage} ${TEXTS_FOR_RESPONSES[step]} ${askNextMessage} ${
  TEXTS_FOR_RESPONSES[step + 1]
}`;

const getReplyMessageForPhoto = () => `${thanksMessage} ${TEXTS_FOR_RESPONSES[5]}`;

const regularStep = ({ ctx, messages, step }) => {
  ctx.session.messages = ctx.session.messages.concat(messages);
  ctx.reply(getReplyMessage(step));
  return ctx.wizard.next();
};

const botSteps = [
  (ctx) => {
    ctx.reply(
      'Hola, para cargar una situación escribi como se muestra a continuacion, usando los saltos de linea. En caso de no aplicar, llenar con "-"',
    );
    ctx.reply(
      '<Fecha de noticia>\n<Zona>\n<Dirección>\n<Por donde llego>\n<Patente>\n<Persona sospechosa>',
    );
    ctx.session = {};
    ctx.session.messages = [];

    return ctx.wizard.next();
  },
  (ctx) => {
    const someMessages = ctx.message?.text?.split('\n');
    const messages = [...Array(6)].map((x, index) => someMessages[index] || ' ');
    regularStep({ ctx, messages, step: 0 });
  },
  (ctx) => {
    const messages = ctx.message?.text;
    regularStep({ ctx, messages, step: DESCRIPTION });
  },
  (ctx) => {
    const messages = ctx.message?.text;
    regularStep({ ctx, messages, step: RESOLUTION });
  },
  (ctx) => {
    if (ctx.update.message.photo) {
      ctx.reply(getReplyMessageForPhoto());
      return ctx.wizard.next();
    }
    const messages = ctx.message?.text;
    return regularStep({ ctx, messages, step: OBSERVATIONS });
  },
  async (ctx) => {
    if (ctx.update.message.photo) {
      const photosArr = ctx.update.message.photo;
      let photoId = '';
      photosArr.length > 3 ? (photoId = photosArr[3].file_id) : (photoId = photosArr[2].file_id);
      const url = await ctx.telegram.getFileLink(photoId);
      ctx.session.messages = ctx.session.messages.concat(`=IMAGE("${url}")`);
    }
    return ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
  },
];

export default botSteps;
