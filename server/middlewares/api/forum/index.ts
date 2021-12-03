import { Router } from 'express';
import topic from './topic.controller';
import comment from './comment.controller';

const router = Router();

router
  .use('/topic', topic)
  .use('/comment', comment);

export default router;
