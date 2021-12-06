import { Router } from 'express';
import { Comment } from '../../../database/entities';

const router = Router();

// todo [sitnik] проверка параметров

router.get('/:topicId/:offset/:limit', (req, res) => {
  const { topicId, offset, limit } = req.params;
  Comment.findAll({
    where: { topicId: Number(topicId) },
    offset: Number(offset),
    limit: Number(limit),
  })
    .then((comments) => {
      res.send(comments);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // todo [sitnik] проверка на application/json
  const { text, topicId } = req.body;
  Comment.create({ text, topicId, authorId: req.authorizedUser.id })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/:topicId/count', (req, res) => {
  const { topicId } = req.params;
  Comment.count({
    where: { topicId: Number(topicId) },
  })
    .then((commentCount) => {
      res.send(commentCount.toString());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;
