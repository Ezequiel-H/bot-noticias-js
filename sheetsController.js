/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { google } from 'googleapis';
import formatDate from './utils.js';

const auth = await new google.auth.GoogleAuth({
  keyFile: 'google-credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const client = await auth.getClient();
const googleSheets = await google.sheets({ version: 'v4', auth: client });

const addSituation = async (messages) => {
  if (!!messages && messages.length > 3) {
    const fullMessage = [[formatDate(new Date(), 'dd-MM-yy'), ...messages]];
    const postMessage = await googleSheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:Z',
      valueInputOption: 'USER_ENTERED',
      resource: { values: fullMessage },
    });
    console.log(`Created At: ${new Date()} status: ${postMessage.statusText}`);
  }
};

export default addSituation;
