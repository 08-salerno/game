import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../../../../modules/redux/store';
import CommentViewer from './CommentViewer';

it('CommentViewer', () => {
  const author = {
    id: 0,
    first_name: 'string',
    second_name: 'string',
    display_name: 'string',
    login: 'string',
    email: 'string',
    phone: 'string',
    avatar: 'string',
  };
  expect(render(<Provider store={store}>
    <CommentViewer id="id" text="text" createdAt="createdAt" author={author} />
                </Provider>)).toMatchSnapshot();
});
