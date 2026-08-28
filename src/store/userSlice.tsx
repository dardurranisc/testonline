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
        const response = await fetch('https://interns-test-fe.snp.agency/api/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data);
        }

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
          const response = await fetch('/api/proxy/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (!response.ok) {
            return rejectWithValue(data);
          }

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
          const response = await fetch('/api/proxy/current_user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            credentials: 'include',
          });

          const data = await response.json();

          if (!response.ok) {
            return rejectWithValue(data);
          }

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
          const response = await fetch('/api/proxy/logout', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
          });

          if (response.status === 204) {
            return;
          }

          const data = await response.json();

          if (!response.ok) {
            return rejectWithValue(data);
          }

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
