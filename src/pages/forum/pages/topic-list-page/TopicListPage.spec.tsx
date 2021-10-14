import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../../../modules/redux/store';
import TopicListPage from './TopicListPage';

it('TopicListPage', () => {
  expect(render(<Provider store={store}>
                    <Router>
                      <TopicListPage />
                    </Router>
                </Provider>)).toMatchSnapshot();
});
