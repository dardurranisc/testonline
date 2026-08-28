import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faPlus,
  faTrash,
  faX,
} from '@fortawesome/free-solid-svg-icons';

import { AnswerBase } from '@/types/answer';

import CustomRadio from '@components/CustomRadio';
import CustomCheckbox from '@components/CustomCheckbox';
import Button from '@components/Button';
import Sortable from '@components/Sortable';

import styles from './QuestionForm.module.scss';

interface QuestionFormProps {
  isFormOpen: boolean;
  mode: 'add' | 'edit';
  titleQuestion: string;
  typeQuestion: string;
  answers: AnswerBase[];
  numberAnswer: string;
  questionUuid: string;
  setAnswers: (value: AnswerBase[]) => void;
  onTitleChange: (value: string) => void;
  onNumberAnswerChange: (value: string) => void;
  onUpdateAnswerChange: (uuid: string, type: string, value: boolean | string) => void;
  handleAnswerMoveUp: (value: number) => void;
  handleAnswerMoveDown: (value: number) => void;
  handleAnswerDelete: (value: string) => void;
  addAnswer: () => void;
  saveQuestion: () => void;
  onCancel: () => void;
}

const QuestionForm = ({
  isFormOpen,
  mode,
  titleQuestion,
  typeQuestion,
  answers,
  numberAnswer,
  questionUuid,
  setAnswers,
  onTitleChange,
  onNumberAnswerChange,
  onUpdateAnswerChange,
  handleAnswerMoveUp,
  handleAnswerMoveDown,
  handleAnswerDelete,
  addAnswer,
  saveQuestion,
  onCancel,
}: QuestionFormProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (source && isSortable(source)) {
      const prevIndex = source.initialIndex as number;
      const newIndex = source.index as number;

      if (prevIndex !== newIndex) {
        const newAnswers = [...answers];
        const [moved] = newAnswers.splice(prevIndex, 1);
        newAnswers.splice(newIndex, 0, moved);
        newAnswers.forEach((answer, index) => (answer.position = index));
        setAnswers(newAnswers);
      }
    }
  };

  return (
    <div className={isFormOpen ? styles.blockActive : styles.none}>
      <h3>{mode === 'edit' ? 'Редактирование вопроса' : 'Новый вопрос'}</h3>
      <form className={styles.form}>
        <div className={styles.list}>
          <label htmlFor="">Текст вопроса</label>
          <input
            placeholder="Введите вопрос"
            type="text"
            value={titleQuestion}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className={styles.list}>
          <label>Вариант(ы) ответа</label>
          {typeQuestion === 'number' ? (
            <div className={styles.variant}>
              <input
                placeholder="Введите правильное число"
                type="text"
                value={numberAnswer}
                onChange={(e) => onNumberAnswerChange(e.target.value)}
              />
            </div>
          ) : (
            <>
              <DragDropProvider onDragEnd={handleDragEnd}>
                {answers.map((answer, index) => (
                  <Sortable key={answer.uuid} id={answer.uuid} index={index}>
                    <div className={styles.variant} key={answer.uuid}>
                      {typeQuestion === 'single' ? (
                        <CustomRadio
                          htmlFor={answer.uuid}
                          name={questionUuid}
                          id={answer.uuid}
                          checked={answer.is_right}
                          onChange={() => {
                            const updated = answers.map((prev) => ({
                              ...prev,
                              is_right: prev.uuid === answer.uuid,
                            }));
                            setAnswers(updated);
                          }}
                        />
                      ) : (
                        <CustomCheckbox
                          htmlFor={answer.uuid}
                          name={questionUuid}
                          id={answer.uuid}
                          checked={answer.is_right}
                          onChange={(e) =>
                            onUpdateAnswerChange(answer.uuid, 'is_right', e.target.checked)
                          }
                        />
                      )}
                      <input
                        placeholder={`Вариант ${answer.position}`}
                        type="text"
                        value={answer.text}
                        onChange={(e) => onUpdateAnswerChange(answer.uuid, 'text', e.target.value)}
                      />
                      <div className={styles.options}>
                        <Button
                          disabled={answer.position === 0}
                          onClick={() => handleAnswerMoveUp(answer.position)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          disabled={answer.position === answers.length - 1}
                          onClick={() => handleAnswerMoveDown(answer.position)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button variant="black" onClick={() => handleAnswerDelete(answer.uuid)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </div>
                  </Sortable>
                ))}
              </DragDropProvider>
              <Button variant="black" onClick={addAnswer}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </>
          )}
        </div>
        <div className={styles.btnsForQuestion}>
          <Button onClick={onCancel}>
            <FontAwesomeIcon icon={faX} />
          </Button>
          <Button variant="black" onClick={saveQuestion}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
