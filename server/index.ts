import express from 'express';
import render from './middlewares/render/render';

const app = express();
const PORT = 3000;

// сначала перехватывает отдачу статики
app.use('/client', express.static('./dist/client'))
// потом всё остальное, что скорее всего запрос за html'кой
  .use(render);

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
