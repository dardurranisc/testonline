import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useDebounce } from 'use-debounce';

import { RootState } from '@/store';

import { usePagination } from '@/hooks/usePagination';
import { useTests } from '@/hooks/useTests';

import Section from '@components/Section';
import Container from '@components/Container/Container';
import TestItem from '@components/TestItem';
import Pagination from '@components/Pagination';
import Search from '@components/Search/Search';
import ConfirmModal from '@components/ConfirmModal';

import { TestBase, PaginationParametersQuery } from '@/types/test';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    handlePage,
    handlePrevPage,
    handleNextPage,
  } = usePagination();
  const { tests, fetchTests } = useTests();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 600);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [testTitle, setTestTitle] = useState('');
  const [idTest, setIdTest] = useState<number>();
  const router = useRouter();

  const sortField = 'created_at';
  const perPage = 6;

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    setCurrentPage(1);
  };

  const handleTestConfirm = (test: TestBase) => {
    setTestTitle(test.title);
    setIdTest(test.id);
    setIsOpen(true);
  };

  useEffect(() => {
    const query: PaginationParametersQuery = {
      page: currentPage,
      per_page: perPage,
      sort_direction: sortDirection,
      sort_field: sortField,
    };

    if (debouncedSearch.trim() !== '') {
      query.search = debouncedSearch.trim();
    }

    const loadTests = async () => {
      const total = await fetchTests(query);
      setTotalPages(total);
    };

    loadTests();
  }, [currentPage, debouncedSearch, sortDirection, sortField, fetchTests, setTotalPages]);

  return (
    <>
      <Section>
        <Container>
          <div className={styles.wrapper}>
            <h1 className={styles.heading}>Тесты</h1>
            <Search
              label="Фильтр по названию"
              placeholder="Найти тест.."
              sortDirection={sortDirection}
              onChange={handleChangeSearch}
              onClick={toggleSortDirection}
            />
            <div className={styles.block}>
              {tests.length >= 1 ? (
                tests.map((test) => (
                  <TestItem
                    key={test.id}
                    title={test.title}
                    mode={currentUser?.user_type}
                    testId={test.id}
                    onClick={() => handleTestConfirm(test)}
                  />
                ))
              ) : (
                <p>Тестов по данному запросу нет...Попробуйте другой запрос</p>
              )}
            </div>
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleChangePage={handlePage}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
            )}
          </div>
          <ConfirmModal
            heading="Начать прохождения теста?"
            message={
              <p>
                Вы хотите начать прохождения теста `<span>{testTitle}</span>`
              </p>
            }
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => router.push(`/tests/${idTest}`)}
          />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
