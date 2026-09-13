import { req } from '@/utils/api';

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
          const data = await req({
            method: 'POST',
            url: `/api/proxy/tests/${testId}/questions`,
            body: questions,
          });

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
          const data = await req({
            method: 'PATCH',
            url: `/api/proxy/tests/${testId}/questions`,
            body: questions,
          });

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
