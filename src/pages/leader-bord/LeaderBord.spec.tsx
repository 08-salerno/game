import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../modules/redux/store';
import LeaderBord from './LeaderBord';

it('LeaderBord', () => {
  expect(render(<Provider store={store}>
              <Router>
                <LeaderBord />
              </Router>
                </Provider>)).toMatchSnapshot();
});
