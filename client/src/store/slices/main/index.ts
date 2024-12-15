/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import initialState from './initialState';
import { IUser } from '../../../types';

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },
  },
});

export default mainSlice;
