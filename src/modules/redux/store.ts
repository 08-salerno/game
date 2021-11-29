import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import rootSaga from './sagas/root.saga';

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  preloadedState,
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
