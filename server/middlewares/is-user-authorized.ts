import { RequestHandler } from 'express';

const isUserAuthorized: RequestHandler = (req, res, next) => {
  if (req.authorizedUser) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default isUserAuthorized;
