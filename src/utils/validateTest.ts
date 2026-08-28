import { QuestionBase } from '@/types/question';

type ValidateTestParams = {
  title: string;
  questions: QuestionBase[];
  mode: 'add' | 'edit';
};

export const validateTest = ({ title, questions, mode }: ValidateTestParams) => {
  if (title.trim() === '') {
    return { isValid: false, error: 'Ввелите название теста' };
  }

  if (mode === 'add' && questions.length === 0) {
    return { isValid: false, error: 'Нельзя создать тест без вопросов!' };
  }

  return { isValid: true };
};
