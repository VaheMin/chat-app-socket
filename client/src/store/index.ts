import { configureStore } from '@reduxjs/toolkit';

import reducer from './rootReducer';

const store = configureStore({
  reducer,
  devTools: { trace: true, traceLimit: 15 },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
