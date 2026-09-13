import { req } from '@/utils/api';

import { NewUser } from '@/types/user';
import { CurrentUser } from '@/types/user';

import { thunkSlice } from './thunkSlice';

interface InitialStateProps {
  currentUser: CurrentUser | null;
  isStatus: 'default' | 'loading' | 'resolved' | 'rejected';
  error: string | null;
}

const initialState: InitialStateProps = {
  currentUser: null,
  isStatus: 'default',
  error: null,
};

const userSlice = thunkSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    signUp: create.asyncThunk(async (userData: NewUser, { rejectWithValue }) => {
      try {
        const data = await req({
          method: 'POST',
          url: `https://interns-test-fe.snp.agency/api/signup/`,
          body: userData,
        });

        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }),
    signIn: create.asyncThunk(
      async (
        userData: Omit<NewUser, 'password_confirmation' | 'is_admin'>,
        { rejectWithValue }
      ) => {
        try {
          const data = await req({
            method: 'POST',
            url: `/api/proxy/signin`,
            body: userData,
          });

          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        pending: (state) => {
          state.isStatus = 'loading';
        },
        fulfilled: (state, action) => {
          state.isStatus = 'resolved';
          state.currentUser = action.payload;
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    getCurrentUser: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const data = await req({
            method: 'GET',
            url: '/api/proxy/current_user',
            credentials: 'include',
          });

          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        pending: (state) => {
          state.isStatus = 'loading';
        },
        fulfilled: (state, action) => {
          state.isStatus = 'resolved';
          state.currentUser = action.payload;
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    logOut: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const data = await req({
            method: 'DELETE',
            url: '/api/proxy/logout',
          });

          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        pending: (state) => {
          state.isStatus = 'loading';
        },
        fulfilled: (state) => {
          state.isStatus = 'resolved';
          state.currentUser = null;
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
  }),
});

export default userSlice.reducer;

export const { signUp, signIn, getCurrentUser, logOut } = userSlice.actions;
