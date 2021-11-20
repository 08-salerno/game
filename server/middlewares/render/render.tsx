import React from 'react';
import { RequestHandler } from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import fs from 'fs';
import { configureStore } from '@reduxjs/toolkit';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import userReducer from '../../../src/modules/redux/slices/userSlice';

const jsFiles: Array<string> = [];

fs.readdirSync('./dist/client').forEach((file) => {
  if (file.includes('app')) jsFiles.push(`/client/${file}`);
});

function makeHTMLPage({
  content, css,
}: {
    content: string;
    css: string;
}): string {
  // const escapedContent = htmlescape(content);
  const html = renderToStaticMarkup(
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>From SSR with Love</title>
    <style>{css}</style>
        </head>
    <body>
    {/* eslint-disable-next-line react/no-danger */}
    <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
    {jsFiles.map((script, index) => (
        <script src={script} key={index} />
    ))}
    </body>
        </html>,
  );
  return `<!DOCTYPE html>${html}`;
}

// todo [sitnik] придумать как импортировать bundle и вызвать из него <App>, передать его в renderToString
const bundlePath = '../../ssr.bundle`';
// eslint-disable-next-line import/no-dynamic-require
const App = require(bundlePath);
console.log('render. Import bundle', App.bundle);

const render: RequestHandler = (req, res, next) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    // todo [sitnik] включу проверить, когда заработают руты нормально
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  });

  const sheet = new ServerStyleSheet();
  const appContentHTML = renderToString(
        <StaticRouter context={{}} location={req.url}>
            <StyleSheetManager sheet={sheet.instance}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StyleSheetManager>
        </StaticRouter>,
  );
  const css = sheet.instance.toString();
  sheet.seal();

  res.send(
    makeHTMLPage({
      content: appContentHTML,
      css,
    }),
  );

  // todo [sitnik] под вопросом
  next();
};

export default render;
