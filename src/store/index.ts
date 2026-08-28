import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import testSlice from './testSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    test: testSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
