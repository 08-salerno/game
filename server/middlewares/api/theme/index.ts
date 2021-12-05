import { Router } from 'express';
import theme from './theme.controller';

const router = Router();

router
  .use('/theme', theme);

export default router;
