import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { QuestionBase } from '@/types/question';

import Button from '@components/Button';

import styles from './QuestionItem.module.scss';

const questionLabel = {
  single: 'Один из списка',
  multiple: 'Несколько из списка',
  number: 'Численный ответ',
};

interface QuestionItemProps {
  question: QuestionBase;
  index: number;
  handleEditQuestion: (value: string) => void;
  handleDeleteQuestion: (value: string) => void;
}

const QuestionItem = ({
  question,
  index,
  handleEditQuestion,
  handleDeleteQuestion,
}: QuestionItemProps) => {
  return (
    <div className={styles.question}>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.questionNumeration}>Вопрос {index + 1}</span>
          <span className={styles.role}>{questionLabel[question.question_type]}</span>
        </div>
        <div className={styles.main}>
          <h3 className={styles.title}>{question.title}</h3>
          <span className={styles.countAnswers}>Вариантов ответа:{question.answers.length}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <Button onClick={() => handleEditQuestion(question.uuid)}>
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button variant="black" onClick={() => handleDeleteQuestion(question.uuid)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default QuestionItem;
