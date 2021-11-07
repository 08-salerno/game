// const express = require('express');
// const path = require('path');
// const cors = require('cors');
//
// const PORT = process.env.PORT || 3001;
//
// const STATIC = path.resolve(__dirname, 'dist');
// const INDEX = path.resolve(STATIC, 'index.html');
//
// const app = express();
// app.use(cors({
//   origin: 'https://ya-praktikum.tech',
// }));
//
// // Static content
// app.use(express.static(STATIC));
//
// // All GET request handled by INDEX file
// app.get('*', (req, res) => {
//   res.sendFile(INDEX);
// });
//
// // Start server
// app.listen(PORT, () => {
//   console.log('Server up and running on ', `http://localhost:${PORT}/`);
// });
import path from 'path';
import express, { RequestHandler } from 'express';
import 'babel-polyfill';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import serverRenderMiddleware from './server-render-middleware';
import config from '../webpack/client.config';

function getWebpackMiddlewares(config: webpack.Configuration): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  return [
    devMiddleware(compiler, {
      publicPath: '/',
    }),
    // @ts-ignore
    hotMiddleware(compiler, { path: `/__webpack_hmr` }),
  ];
}

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', [...getWebpackMiddlewares(config)], serverRenderMiddleware);

export { app };
