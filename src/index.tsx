import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import App from './App';
import './modules/service-worker/service-worker-registrator';

const Root: React.VFC = () => (
    <>
        <Normalize />
        <App />
    </>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
