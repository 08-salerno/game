import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { User } from '../../api/types';
import { RootState } from '../store';

export type UserStateValue = User | null

export interface UserState {
    value: UserStateValue
}

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    putUser: (state, action: PayloadAction<UserStateValue>) => {
      state.value = action.payload;
    },
    putUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.avatar = action.payload;
      }
      return state;
    },
  },
});

export const { putUser, putUserAvatar } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = createSelector((state: RootState): UserState => state.user, (user: UserState) => user.value);
export const selectIsAuthorized = createSelector(selectUser, (user: UserStateValue): boolean => !!user);
export const selectAvatar = createSelector(selectUser, (user: UserStateValue): string | undefined => user?.avatar);
