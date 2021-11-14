import express, { Request, Response } from 'express';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import htmlescape from 'htmlescape';
import App from './App';

const app = express();
const PORT = 3000;

function makeHTMLPage(content: string): string {
  // const escapedContent = htmlescape(content);
  const html = renderToStaticMarkup(
      <html lang="en">
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>From SSR with Love</title>
      </head>
      <body>
      {/* eslint-disable-next-line react/no-danger */}
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      </body>
      </html>,
  );
  return `<!DOCTYPE html>${html}`;
}

app.get('/', (_: Request, res: Response) => {
  const appContentHTML = renderToString(<App />);
  res.send(makeHTMLPage(appContentHTML));
});

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
