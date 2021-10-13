import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../modules/redux/store';
import Register from './Register';

it('Register', () => {
  expect(render(<Provider store={store}>
                    <Router>
                      <Register />
                    </Router>
                </Provider>)).toMatchSnapshot();
});
