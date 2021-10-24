import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../modules/redux/store';
import GameGrid from './GameGrid';

it('GameGrid', () => {
  expect(render(<Provider store={store}>
                    <GameGrid onGameOver={() => {}} />
                </Provider>)).toMatchSnapshot();
});
