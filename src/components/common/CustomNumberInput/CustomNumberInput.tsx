import { ChangeEvent } from 'react';

import styles from './CustomNumberInput.module.scss';

interface CustomNumberInputProps {
  value: string;
  id: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomNumberInput = ({ value, id, placeholder, onChange }: CustomNumberInputProps) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default CustomNumberInput;
