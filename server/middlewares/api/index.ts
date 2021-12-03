import express, { Router } from 'express';
import forum from './forum/index';

const router = Router();

router.use(express.json())
  .use(forum);
// todo [sitnik] use(theme)

export default router;
