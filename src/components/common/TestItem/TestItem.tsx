import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '@components/Button';

import styles from './TestItem.module.scss';

interface TestItemProps {
  title: string;
  testId: number;
  mode: 'admin' | 'user' | undefined;
  onClick: () => void;
}

const TestItem = ({ title, testId, mode, onClick }: TestItemProps) => {
  return (
    <div className={styles.test}>
      <div className={styles.header} onClick={onClick}>
        <h2>{title}</h2>
        <Button onClick={onClick} variant="transparent" className={styles.openTestBtn}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
      {mode === 'admin' && (
        <div className={styles.extraBlock}>
          <Link className={styles.edit} href={`/editTest/${testId}`}>
            <FontAwesomeIcon icon={faPen} />
            Редактировать
          </Link>
        </div>
      )}
    </div>
  );
};

export default TestItem;
