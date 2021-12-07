import express, { Router } from 'express';
import forum from './forum/index';
import theme from './theme/index';

const router = Router();

router.use(express.json())
  .use(forum)
  .use(theme);

export default router;
