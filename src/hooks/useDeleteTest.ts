import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { deleteTest } from '@/store/testSlice';

export const useDeleteTest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const deleteTestById = async (currentTestId: string) => {
    try {
      await dispatch(deleteTest(currentTestId)).unwrap();
      alert('Тест удалён!');
      router.push('/');
    } catch (error) {
      console.error('Ошибка при удалении теста.', error);
      const err = error as { message?: string };
      const message = err?.message || 'Ошибка при удалении теста. Попробуйте позже.';
      alert(message);
    }
  };

  return { deleteTestById };
};
