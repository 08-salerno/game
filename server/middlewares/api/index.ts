import express, { Router } from 'express';
import forum from './forum/index';
import theme from './theme/index';
import isUserAuthorized from '../is-user-authorized';

const router = Router();

router.use(isUserAuthorized)
  .use(express.json())
  .use(forum)
  .use(theme);

export default router;
