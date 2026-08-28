import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { QuestionBase } from '@/types/question';

import { AppDispatch } from '@/store';
import { addTest, updateTest } from '@/store/testSlice';
import { addQuestion, updateQuestions } from '@/store/questionSlice';

import { validateTest } from '@/utils/validateTest';

type UseSaveTestParams = {
  titleTest: string;
  questions: QuestionBase[];
  currentTestId?: string;
  mode: 'add' | 'edit';
};

export const useSaveTest = ({ titleTest, questions, currentTestId, mode }: UseSaveTestParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const saveTest = async () => {
    const validation = validateTest({
      title: titleTest,
      questions: questions,
      mode: mode,
    });

    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      if (mode === 'edit' && currentTestId) {
        await dispatch(
          updateTest({ id: currentTestId, title: titleTest, is_published: true })
        ).unwrap();

        console.log('Обновление вопросов для testId:', currentTestId);
        console.log('Тип testId:', typeof currentTestId);
        console.log('Вопросы:', questions);

        await dispatch(
          updateQuestions({
            testId: Number(currentTestId),
            questions,
          })
        ).unwrap();

        alert('Тест обновлён!');
        router.push('/');
      } else {
        const created = (await dispatch(addTest(titleTest))).payload;
        const testId = created.id;
        if (questions.length >= 1) {
          await dispatch(addQuestion({ testId, questions })).unwrap();
        }
        alert('Тест создан!');
        router.push('/');
      }
    } catch (error) {
      console.error('Ошибка при сохранении теста:', error);
      const err = error as { message?: string };
      const message = err?.message || 'Ошибка при сохранении теста. Попробуйте позже.';
      alert(message);
    }
  };

  return { saveTest };
};
