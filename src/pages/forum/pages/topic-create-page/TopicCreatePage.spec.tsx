import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import TopicCreatePage from './TopicCreatePage';
import store from '../../../../modules/redux/store';

it('Auth', () => {
  expect(render(<Provider store={store}>
                    <TopicCreatePage />
                </Provider>)).toMatchSnapshot();
});
