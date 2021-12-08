import { Router } from 'express';
import { Topic } from '../../../database/entities';

const router = Router();

// todo [sitnik] проверка параметров

router.get('/:offset/:limit', (req, res) => {
  const { offset, limit } = req.params;
  Topic.findAll({ offset: Number(offset), limit: Number(limit) })
    .then((topics) => Promise.all(topics.map((topic) => topic.countComments().then(() => Promise.resolve(topic)))))
    .then((topics) => {
      res.send(topics);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Topic.findByPk(Number(id))
    .then((topic) => {
      if (topic) {
        return topic.countComments().then(() => Promise.resolve(topic));
      }
      return null;
    })
    .then((topic) => {
      res.send(topic);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // todo [sitnik] проверка на application/json
  const { title } = req.body;
  Topic.create({ title, authorId: req.authorizedUser!.id })
    .then((topic) => {
      res.send(topic.id.toString());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;
