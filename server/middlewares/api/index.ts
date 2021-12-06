import express, { Router } from 'express';
import forum from './forum/index';
import theme from './theme/index';
import practicumUserChecker from '../practicum-user-hecker';

const router = Router();

router.use(express.json())
  .use(practicumUserChecker)
  .use(forum)
  .use(theme);

export default router;
