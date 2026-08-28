import { ChangeEvent } from 'react';

import styles from './CustomCheckbox.module.scss';

interface CustomCheckboxProps {
  label?: string;
  name: string;
  id: string;
  htmlFor: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox = ({ label, name, id, htmlFor, checked, onChange }: CustomCheckboxProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      <input
        className={styles.input}
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.customCheckbox}></span>
      {label}
    </label>
  );
};

export default CustomCheckbox;
