import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../modules/redux/store';
import Forum from './Forum';

it('Forum', () => {
  expect(render(<Provider store={store}>
                <Router>
                  <Forum />
                </Router>
                </Provider>)).toMatchSnapshot();
});
