// @ts-ignore
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
// import { StaticRouter } from 'react-router-dom';
// import { StaticRouterContext } from 'react-router';
// import { Provider as ReduxProvider } from 'react-redux';
// import { ServerStyleSheets } from '@material-ui/core/styles';
// import { getInitialState } from './store/getInitialState';
// import { configureStore } from './store/rootStore';
// import App from './App';

export default (_req: Request, res: Response):void => {
  // const location = req.url;
  // const context: StaticRouterContext = {};
  // const { store } = configureStore(getInitialState(location), location);

  const jsx = (
    // <ReduxProvider store={store}>
    //   <StaticRouter context={context} location={location}>
    <div>test из middleware</div>
    //   </StaticRouter>
    // </ReduxProvider>
  );
  const reactHtml = renderToString(jsx);
  // const reduxState = store.getState();
  //
  // if (context.url) {
  //   res.redirect(context.url);
  //   return;
  // }

  res.status(200).send(getHtml(reactHtml));
};

function getHtml(reactHtml: string, reduxState = {}, css?: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <meta content="#000000" name="theme-color" />
              <meta content="Mario game" name="description" />
              <link href="manifest.json" rel="manifest" />
              <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              <title>Mario Pro Max | SSR</title>
<!--              <style id="jss-server-side">${css}</style>-->
          </head>
          <body>
              <div id="root">${reactHtml}</div>
              <script>
                  window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
              </script>
              <script src="/main.js"></script>
          </body>
        </html>
    `;
}
