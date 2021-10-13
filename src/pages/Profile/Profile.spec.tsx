import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import Profile from './Profile';
import store from '../../modules/redux/store';

it('Profile', () => {
  expect(render(<Provider store={store}>
                  <Profile />
                </Provider>)).toMatchSnapshot();
});
