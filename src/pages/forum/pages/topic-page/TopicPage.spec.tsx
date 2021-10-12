import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../../../modules/redux/store';
import TopicPage from './TopicPage';

it('TopicPage', () => {
  expect(render(<Provider store={store}>
                  <Router>
                    <TopicPage />
                  </Router>
                </Provider>)).toMatchSnapshot();
});
