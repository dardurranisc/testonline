import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const thunkSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});
