// @ts-ignore
import React from 'react';
import { hydrate } from 'react-dom';
// import { Normalize } from 'styled-normalize';
// import { Provider } from 'react-redux';
// import store from './modules/redux/store';
// import App from './App';
// import './modules/service-worker/service-worker-registrator';

// import "./index.css";
// import "./serviceWorker";
//
// import { configureStore } from "./store/rootStore";
// import { State } from "./store/rootStore";
//
// import { ConnectedRouter } from "connected-react-router";
//
// declare global {
//   interface Window {
//     __INITIAL_STATE__: State;
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
//     devMode: Boolean;
//   }
// }
//
// const { store, history } = configureStore(window.__INITIAL_STATE__);
//
// hydrate(
//   <React.StrictMode>
//     <ErrorHandler>
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <App />
//         </ConnectedRouter>
//       </Provider>
//     </ErrorHandler>
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

// if ('serviceWorker' in navigator) {
//   // Use the window load event to keep the page load performant
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/serviceWorker.js')
//       .then((registration) => {
//         console.log('Registration succeeded.');
//         if (window.devMode) {
//           registration.unregister().then((boolean) => {
//             console.log('Unregister succeeded!');
//           });
//         }
//       })
//       .catch((e) => {
//         //nothing to do
//       });
//   });
// }
// <>
//   <Normalize />
//   <Provider store={store}>
//     <App />
//   </Provider>
// </>
hydrate(
  <div>
 test 1a awd
  </div>,
  document.querySelector('#root'),
);
