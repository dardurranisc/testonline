import { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  type?: 'button';
  variant?: 'black' | 'white' | 'transparent';
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({
  className,
  type = 'button',
  variant = 'white',
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className)}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
