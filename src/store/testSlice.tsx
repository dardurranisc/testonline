import { PayloadAction } from '@reduxjs/toolkit';

import { TestBase } from '@/types/test';
import { TestRetrieve } from '@/types/test';
import { PaginationMetadata } from '@/types/test';
import { PaginationParametersQuery } from '@/types/test';
import { PaginatedTestBase } from '@/types/test';

import { thunkSlice } from './thunkSlice';

interface initialStateProps {
  paginations: PaginationMetadata;
  results: TestBase[];
  currentTest: TestRetrieve | null;
  isStatus: 'default' | 'loading' | 'resolved' | 'rejected';
  error: string | null;
}

const initialState: initialStateProps = {
  paginations: {
    current_page: 1,
    per_page: 10,
    next_page: null,
    prev_page: null,
    total_pages: 1,
    total_count: 0,
  },
  results: [],
  currentTest: null,
  isStatus: 'default',
  error: null,
};

const testSlice = thunkSlice({
  name: 'test',
  initialState,
  reducers: (create) => ({
    addTest: create.asyncThunk(
      async (title: string, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/proxy/tests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            body: JSON.stringify({ title }),
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
        fulfilled: (state, action: PayloadAction<TestBase>) => {
          state.results.push(action.payload);
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    getTests: create.asyncThunk(
      async (payload: PaginationParametersQuery, { rejectWithValue }) => {
        const queryParameters = new URLSearchParams(payload as Record<string, string>);
        try {
          const response = await fetch(`/api/proxy/tests?${queryParameters.toString()}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
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
        fulfilled: (state, action: PayloadAction<PaginatedTestBase>) => {
          state.isStatus = 'resolved';
          state.paginations = action.payload.paginations;
          state.results = action.payload.results;
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    getTestById: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          const response = await fetch(`/api/proxy/tests/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
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
        fulfilled: (state, action: PayloadAction<TestRetrieve>) => {
          state.isStatus = 'resolved';
          state.currentTest = action.payload;
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    updateTest: create.asyncThunk(
      async (
        { id, title, is_published }: { id: string; title: string; is_published: boolean },
        { rejectWithValue }
      ) => {
        try {
          const response = await fetch(`/api/proxy/tests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            body: JSON.stringify({ title, is_published }),
          });

          const data = await response.json();

          if (!response.ok) {
            return rejectWithValue(data);
          }

          return { id, data };
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
          const payload = action.payload as { id: string; data: TestBase };
          const index = state.results.findIndex((test) => test.id === Number(payload.id));
          if (index !== -1) {
            state.results[index] = payload.data;
          }
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    deleteTest: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          const response = await fetch(`/api/proxy/tests/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
          });

          if (response.status === 204) {
            return { id };
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
        fulfilled: (state, action) => {
          state.isStatus = 'resolved';
          state.results = state.results.filter((t) => t.id !== Number(action.payload.id));
        },
        rejected: (state, action) => {
          state.isStatus = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
  }),
});

export const { addTest, getTests, getTestById, updateTest, deleteTest } = testSlice.actions;

export default testSlice.reducer;
