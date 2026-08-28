import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import { QuestionTypeEnum } from '@/types/question';

import Button from '@components/Button';

import styles from './QuestionTypeSelector.module.scss';

const questionsTypeOptions: { value: QuestionTypeEnum; text: string }[] = [
  { value: 'single', text: 'Один вариант ответа' },
  { value: 'multiple', text: 'Несколько вариантов ответа' },
  { value: 'number', text: 'Численный ответ' },
];

interface QuestionTypeSelectorProps {
  typeQuestion: string;
  onTypeQuestionChange: (value: QuestionTypeEnum) => void;
  onOpenFormQuestion: () => void;
}

const QuestionTypeSelector = ({
  typeQuestion,
  onTypeQuestionChange,
  onOpenFormQuestion,
}: QuestionTypeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className={styles.typeQuestion}>
      <div className={styles.dropdown}>
        <label htmlFor="typeQuestion">Тип вопроса:</label>
        <div className={styles.wrapper} onClick={() => setIsOpen(!isOpen)} ref={wrapperRef}>
          <div className={clsx(styles.selectedTitle, isOpen ? styles.active : '')}>
            {questionsTypeOptions.find((type) => type.value === typeQuestion)?.text}
            <span className={styles.arrow}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
          {isOpen && (
            <ul className={styles.dropdown1}>
              {questionsTypeOptions.map((type) => (
                <li
                  key={type.value}
                  className={styles.list}
                  onClick={() => onTypeQuestionChange(type.value)}
                >
                  {type.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button variant="black" onClick={onOpenFormQuestion}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
