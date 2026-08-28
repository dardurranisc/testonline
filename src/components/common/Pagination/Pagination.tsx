import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '@components/Button';

import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  handleChangePage,
  onPrev,
  onNext,
}: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <Button onClick={onPrev} className={styles.arrowPage} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      {pages.map((page) => (
        <Button
          className={clsx(styles.page, currentPage === page && styles.pageActive)}
          key={page}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </Button>
      ))}
      <Button className={styles.arrowPage} onClick={onNext} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </div>
  );
};

export default Pagination;
