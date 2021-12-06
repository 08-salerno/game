import express, { Router } from 'express';
import { Theme, UserTheme } from '../../../database/entities';

const router = Router();

// todo [sitnik] знаю, что лучше не миксовать типы для body
router.use(express.text())
  .route('/:userId')
  .get((req, res) => {
    const { userId } = req.params;
    Theme.findOrCreateLight().then(([lightTheme]) => Promise.all([lightTheme, UserTheme.findOrCreate({
      where: {
        userId: Number(userId),
      },
      defaults: {
        userId: Number(userId),
        themeId: lightTheme.id,
      },
    })]))
      .then(([lightTheme, [userTheme]]: [Theme, [UserTheme, boolean]]) => {
        if (userTheme.themeId === lightTheme.id) {
          return Promise.resolve(lightTheme.name);
        }
        return Theme.findByPk(userTheme.themeId).then((theme) => Promise.resolve(theme?.name || lightTheme.name));
      }).then((themeName) => {
        res.send(themeName);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  })
  .patch((req, res) => {
    const { userId } = req.params;
    const themeName = req.body;
    Promise.all<Theme | null, UserTheme | null>([
      Theme.findOne({ where: { name: themeName } }),
      UserTheme.findByPk(Number(userId)),
    ])
      .then(([theme, userTheme]) => {
        if (theme && userTheme) {
          userTheme.themeId = theme.id;
          return userTheme.save();
        }
        return Promise.reject();
      }).then(() => {
        res.sendStatus(200);
      }).catch(() => {
        res.sendStatus(500);
      });
  });

export default router;
