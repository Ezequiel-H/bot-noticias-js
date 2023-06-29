/* eslint-disable import/extensions */
/* eslint-disable max-len */

import {} from 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

import formatDate from './utils.js';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const jwt = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: `-${process.env.SHEETS_API_KEY.slice(1).slice(0, -1)}`,
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, jwt);
await doc.loadInfo();
const sheet = doc.sheetsByIndex[1];

const addSituation = async (messages) => {
  if (!!messages && messages.length > 3) {
    const fullMessage = [formatDate(new Date(), 'dd-MM-yy'), ...messages];
    await sheet.addRow(fullMessage);
  }
};

export default addSituation;
