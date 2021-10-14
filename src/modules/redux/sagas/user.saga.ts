import {
  call, put, CallEffect, PutEffect, takeLatest, all,
} from 'redux-saga/effects';
import { Action } from '@reduxjs/toolkit';
import AuthService from '../../api/AuthService';
import { putUser, setAuthChecked } from '../slices/userSlice';
import { User } from '../../api/types';

export const fetchUserAction: Action = { type: 'user/saga/fetch' };
export const logoutUserAction: Action = { type: 'user/saga/logout' };

const authService = new AuthService();

function* fetchUser(): Generator<CallEffect | PutEffect, void, void> {
  try {
    const user = yield call(authService.getUser);
    yield put(putUser(user as unknown as User));
  } catch (e) {
    yield put(setAuthChecked(true));
    // nothing
  }
}

function* logoutUser(): Generator<CallEffect | PutEffect, void, void> {
  try {
    yield call(authService.logOut);
    yield put(putUser(null));
  } catch (e) {
    // nothing
  }
}

function* userSaga(): Generator {
  yield all([
    takeLatest(fetchUserAction.type, fetchUser),
    takeLatest(logoutUserAction.type, logoutUser),
  ]);
}

export default userSaga;
