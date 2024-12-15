import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './slices/main';

const reducer = combineReducers({
  main: mainSlice.reducer,
});

export default reducer;
