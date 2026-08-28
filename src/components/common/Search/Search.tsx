import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';

import Button from '@components/Button';

import styles from './Search.module.scss';

interface SearchProps {
  label: string;
  placeholder: string;
  sortDirection: 'asc' | 'desc';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const Search = ({ label, placeholder, sortDirection, onChange, onClick }: SearchProps) => {
  return (
    <div className={styles.panelFilter}>
      <div className={styles.inputGroup}>
        <label htmlFor="search">{label}</label>
        <input
          className={styles.search}
          id="search"
          type="search"
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      </div>
      <Button variant="transparent" onClick={onClick}>
        <FontAwesomeIcon
          icon={sortDirection === 'asc' ? faArrowUpWideShort : faArrowDownWideShort}
        />
      </Button>
    </div>
  );
};

export default Search;
