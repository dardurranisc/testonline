import { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { PaginationParametersQuery, TestBase } from '@/types/test';

import { AppDispatch } from '@/store';
import { getTests } from '@/store/testSlice';

export const useTests = () => {
  const [tests, setTests] = useState<TestBase[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const abortRef = useRef<AbortController | null>(null);

  const fetchTests = useCallback(
    async (queryParams: PaginationParametersQuery) => {
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setTests([]);

      try {
        const result = await dispatch(getTests(queryParams)).unwrap();

        if (controller.signal.aborted) {
          return;
        }

        setTests(result.results);

        return result.pagination.total_pages;
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error('Ошибка при получении тестов:', error);
        const err = error as { message?: string };
        const message = err?.message || 'Ошибка при получении тестов. Попробуйте позже.';

        alert(message);
      }
    },
    [dispatch]
  );

  return { tests, fetchTests };
};
