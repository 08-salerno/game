import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import rootSaga from './sagas/root.saga';

/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
// todo [sitnik] серверный tsconfig почему-то не видит window.d.ts
const preloadedState = (window as any).__PRELOADED_STATE__ || {};
delete (window as any).__PRELOADED_STATE__;

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
