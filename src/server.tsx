import express, { Request, Response } from 'express';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
// import htmlescape from 'htmlescape';
import fs from 'fs';
import App from './App';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/redux/slices/userSlice';
import { Provider } from 'react-redux';

const app = express();
const PORT = 3000;

const jsFiles: Array<string> = [];

fs.readdirSync('./dist/client').forEach((file) => {
  if (file.includes('app')) jsFiles.push(`/client/${file}`);
});

console.log('prepared scripts', jsFiles.length);

function makeHTMLPage({
  content, css
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
    </html>
  );
  return `<!DOCTYPE html>${html}`;
}

app.get('*', (req: Request, res: Response) => {
  console.log('new request', req.url);

  const store = configureStore({
    reducer: {
      user: userReducer
    }
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
    </StaticRouter>
  );
  const css = sheet.instance.toString();
  sheet.seal();

  res.send(
    makeHTMLPage({
      content: appContentHTML,
        css
    })
  );
});

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
