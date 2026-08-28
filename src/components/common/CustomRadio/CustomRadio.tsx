import { ChangeEvent } from 'react';

import styles from './CustomRadio.module.scss';

interface CustomRadioProps {
  label?: string;
  name: string;
  id: string;
  htmlFor: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadio = ({ label, name, id, htmlFor, checked, onChange }: CustomRadioProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.customRadio}></span>
      {label}
    </label>
  );
};

export default CustomRadio;
