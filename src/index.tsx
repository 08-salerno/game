import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './modules/redux/store';
import App from './App';
import './modules/service-worker/service-worker-registrator';

const Root: React.VFC = () => (
    <BrowserRouter>
        CSR
        <Normalize />
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

const entryBlock = document.getElementById('root');
const renderFunction: ReactDOM.Renderer = entryBlock && entryBlock.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

renderFunction(<Root />, entryBlock);
