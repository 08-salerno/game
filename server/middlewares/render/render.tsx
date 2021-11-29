import React from 'react';
import { RequestHandler } from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import fs from 'fs';
import { configureStore, Store } from '@reduxjs/toolkit';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderObject from '../../utils/renderObject';
import userReducer from '../../../src/modules/redux/slices/userSlice';

let jsFiles: Array<string> = [];

/* eslint-disable react/no-danger */
function makeHTMLPage({
  content,
  css,
  store,
}: {
  content: string;
  css: string;
  store: Store;
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
        {jsFiles.map((script, index) => (
          <script defer src={script} key={index} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
          }}
        />
      </body>
    </html>,
  );
  return `<!DOCTYPE html>${html}`;
}

const bundlePath = '../../../ssr.bundle';

const render: RequestHandler = (req, res, next) => {
  jsFiles = [];
  fs.readdirSync('./dist/client').forEach((file) => {
    if (file.includes('app')) jsFiles.push(`/client/${file}`);
  });

  // eslint-disable-next-line import/no-dynamic-require,global-require
  const { bundle: App } = require(bundlePath);

  const store = configureStore({
    reducer: {
      user: userReducer,
    },
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
      store,
    }),
  );

  // todo [sitnik] под вопросом
  next();
};

export default render;
