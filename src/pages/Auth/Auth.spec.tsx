import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import Auth from './Auth';
import store from '../../modules/redux/store';

it('Auth', () => {
  expect(render(<Provider store={store}>
                    <Auth />
                </Provider>)).toMatchSnapshot();
});
