import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import App from './App';

const Root: React.VFC = () => (
    <>
        <Normalize />
        <App />
    </>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
