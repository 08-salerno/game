import express from 'express';
import cors from 'cors';
import render from './middlewares/render/render';
import dbClient from './database/db-client';
import './database/entities/index';
import api from './middlewares/api';

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
// наше апи
  .use('/api', api)
// потом всё остальное, что скорее всего запрос за html'кой
  .use(render);
// todo [sitnik] вариат use('/', render) тоже не помог

dbClient
  .authenticate()
  .then(() => {
    console.log('Server connected to database');
    (async () => {
      await dbClient.sync();
    })();

    // Start server
    app.listen(PORT, () => {
      console.log('Server up and running on ', `http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Не удалось подключиться к базе');
    console.trace(err);
  });
