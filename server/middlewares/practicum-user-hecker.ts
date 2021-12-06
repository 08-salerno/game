import { RequestHandler } from 'express';
import fetch from 'node-fetch';
import { asError, asUser } from '../../src/modules/api/utils';

const practicumUserChecker: RequestHandler = (req, res, next) => {
  // todo [sitnik] вынести в переменные окружения
  const url = 'https://ya-praktikum.tech/api/v2/auth/user';

  fetch(url, {
    headers: {
      cookie: req.headers.cookie || '',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .then(asError)
        .then((err) => Promise.reject(err));
    })
    .then(asUser)
    .then((user) => {
      console.log('Practicum user checker', user);
      req.authorizedUser = user;
      next();
    })
    .catch((err) => {
      console.error('Practicum user checker: Error ', err);
      res.sendStatus(401);
    });
};

export default practicumUserChecker;
