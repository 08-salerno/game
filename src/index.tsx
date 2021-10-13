import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import store from './modules/redux/store';
import App from './App';
import './modules/service-worker/service-worker-registrator';

const Root: React.VFC = () => (
    <>
        <Normalize />
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
