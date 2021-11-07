import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { User } from '../../api/types';
import { RootState } from '../store';

export type UserStateValue = User | null

export interface UserState {
    value: UserStateValue,
  authChecked: boolean,
}

const initialState: UserState = {
  value: null,
  authChecked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.authChecked = action.payload;
    },
    putUser: (state, action: PayloadAction<UserStateValue>) => {
      state.value = action.payload;
      state.authChecked = true;
    },
    putUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.avatar = action.payload;
      }
      return state;
    },
  },
});

export const { putUser, putUserAvatar, setAuthChecked } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState): UserStateValue => state.user.value;
export const selectIsAuthorized = createSelector(selectUser, (user: UserStateValue): boolean => !!user);
export const selectAvatar = createSelector(selectUser, (user: UserStateValue): string | undefined => user?.avatar);
