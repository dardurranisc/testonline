import { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Section.module.scss';

interface SectionProps {
  className?: string;
  children: ReactNode;
}

const Section = ({ className, children }: SectionProps) => {
  return <section className={clsx(styles.section, className)}>{children}</section>;
};

export default Section;
