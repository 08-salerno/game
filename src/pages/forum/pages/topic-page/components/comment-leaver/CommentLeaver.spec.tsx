import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import CommentLeaver from './CommentLeaver';
import store from '../../../../../../modules/redux/store';

it('CommentLeaver', () => {
  expect(render(<Provider store={store}>
                    <CommentLeaver handleLeaveComment={(text: string) => Promise.resolve()} />
                </Provider>)).toMatchSnapshot();
});
