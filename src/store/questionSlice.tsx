import { QuestionBase } from '@/types/question';

import { thunkSlice } from './thunkSlice';

interface InitialStateProps {
  questions: QuestionBase[];
  status: 'default' | 'pending' | 'fullfield' | 'rejected';
  error: null | string;
}

const initialState: InitialStateProps = {
  questions: [],
  status: 'default',
  error: null,
};

const questionSlice = thunkSlice({
  name: 'question',
  initialState,
  reducers: (create) => ({
    addQuestion: create.asyncThunk(
      async (
        { testId, questions }: { testId: number; questions: QuestionBase[] },
        { rejectWithValue }
      ) => {
        try {
          const response = await fetch(`/api/proxy/tests/${testId}/questions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            body: JSON.stringify(questions),
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
          state.status = 'pending';
        },
        fulfilled: (state, action) => {
          state.status = 'fullfield';
          state.questions.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
    updateQuestions: create.asyncThunk(
      async (
        { testId, questions }: { testId: number; questions: QuestionBase[] },
        { rejectWithValue }
      ) => {
        try {
          const response = await fetch(`/api/proxy/tests/${testId}/questions`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            },
            body: JSON.stringify(questions),
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
          state.status = 'pending';
        },
        fulfilled: (state) => {
          state.status = 'fullfield';
        },
        rejected: (state, action) => {
          state.status = 'rejected';
          state.error = action.payload as string;
        },
      }
    ),
  }),
});

export const { addQuestion, updateQuestions } = questionSlice.actions;
export default questionSlice.reducer;
