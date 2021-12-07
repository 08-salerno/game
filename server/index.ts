import express from 'express';
import cors from 'cors';
import https from 'https';
import selfSigned from 'openssl-self-signed-certificate';
import render from './middlewares/render/render';
import dbClient from './database/db-client';
import { Theme } from './database/entities';
import api from './middlewares/api';
import practicumUserChecker from './middlewares/practicum-user-hecker';

const app = express();
const PORT = 3000;

app
  .use(
    cors({
      origin: 'https://ya-praktikum.tech',
    }),
  )
// перехват отдачи статики
  .use('/client', express.static('./dist/client'))
  .use('/assets', express.static('./dist/assets'))
// проверка на авторизованность
  .use(practicumUserChecker)
// наше апи
  .use('/api', api)
// потом всё остальное, что скорее всего запрос за html'кой
  .use(render);

dbClient
  .authenticate()
  .then(() => {
    console.log('Server connected to database');
    (async () => {
      await dbClient.sync();
      await Theme.findOrCreateLight();
      await Theme.findOrCreateDark();
    })();

    // Start server
    https.createServer({
      key: selfSigned.key,
      cert: selfSigned.cert,
    }, app).listen(PORT, () => {
      console.log('Server up and running on ', `https://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Не удалось подключиться к базе');
    console.trace(err);
  });
