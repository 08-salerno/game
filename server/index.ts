import express from 'express';
import cors from 'cors';
import https from 'https';
import selfSigned from 'openssl-self-signed-certificate';
import helmet from 'helmet';
import { nanoid } from 'nanoid';
import { isDev } from './conf';
import render from './middlewares/render/render';
import dbClient from './database/db-client';
import { Theme } from './database/entities';
import api from './middlewares/api';
import practicumUserChecker from './middlewares/practicum-user-hecker';

const app = express();
const PORT = process.env.APP_PORT;

app
  .use((_, res, next) => {
    res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
    next();
  })
  .use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      styleSrc: ["'unsafe-inline'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", 'ya-praktikum.tech', 'data:', 'yastatic.net'],
      mediaSrc: ["'self'"],
      connectSrc: ["'self'", 'ya-praktikum.tech'],
      workerSrc: ["'self'"],
      /* eslint-disable-next-line */
      scriptSrc: ["'self'", (_, res) => `'nonce-${(<any>res).locals.nonce}'`, "'unsafe-eval'", "'unsafe-inline'"],
    },
  }))
  .use(helmet.xssFilter())
  .use(helmet.noSniff())
  .use(
    cors({
      origin: 'https://ya-praktikum.tech',
    }),
  )
// перехват отдачи статики
  .use('/client', express.static('./dist/client'))
  .use('/assets', express.static('./dist/assets'))
// проверка на авторизованность на стороне практикума
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
    if (isDev) {
      https.createServer({
        key: selfSigned.key,
        cert: selfSigned.cert,
      }, app).listen(PORT, () => {
        console.log('Server up and running in DEVELOPMENT mode on ', `https://local.ya-praktikum.tech:${PORT}/`);
      });
    } else {
      app.listen(PORT, () => {
        console.log('Server up and running in PRODUCTION mode on ', `http://localhost:${PORT}/`);
      });
    }
  })
  .catch((err) => {
    console.error('Не удалось подключиться к базе');
    console.trace(err);
  });
