import { useRouter } from 'next/router';

import { useState } from 'react';

import { faArrowLeft, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSaveQuestion } from '@/hooks/useSaveQuestion';
import { useSaveTest } from '@/hooks/useSaveTest';
import { useAnswers } from '@/hooks/useAnswers';
import { useQuestion } from '@/hooks/useQuestion';
import { useDeleteTest } from '@/hooks/useDeleteTest';

import { QuestionBase, QuestionTypeEnum } from '@/types/question';
import { AnswerBase } from '@/types/answer';

import Section from '@components/Section';
import Container from '@components/Container/Container';
import Button from '@components/Button';
import QuestionForm from '@components/QuestionForm';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import QuestionTypeSelector from '@components/QuestionTypeSelector';
import ConfirmModal from '@components/ConfirmModal';

import styles from './TestForm.module.scss';

type TestMode = 'add' | 'edit';

interface TestFormProps {
  currentTestId?: string;
  titleTest: string;
  questions: QuestionBase[];
  typeQuestion: QuestionTypeEnum;
  answers: AnswerBase[];
  mode: TestMode;
  isFormQuestion: boolean;
  titleQuestion: string;
  numberAnswer: string;
  setTitleTest: (value: string) => void;
  setIsFormQuestion: (value: boolean) => void;
  setTitleQuestion: (value: string) => void;
  setQuestions: (value: QuestionBase[]) => void;
  setTypeQuestion: (value: QuestionTypeEnum) => void;
  setNumberAnswer: (value: string) => void;
  setAnswers: (value: AnswerBase[]) => void;
}

const TestFrom = ({
  currentTestId,
  titleTest,
  questions,
  typeQuestion,
  answers,
  mode,
  isFormQuestion,
  titleQuestion,
  numberAnswer,
  setTitleTest,
  setIsFormQuestion,
  setTitleQuestion,
  setQuestions,
  setTypeQuestion,
  setNumberAnswer,
  setAnswers,
}: TestFormProps) => {
  const [isShowSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isShowDeleteTestConfirm, setShowDeleteTestConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [isShowDeleteQuestionConfirm, setIsShowDeleteQuestionConfirm] = useState(false);
  const [editingQuestionUuid, setEditingQuestionUuid] = useState<string | null>(null);
  const router = useRouter();

  const resetForm = () => {
    setTitleQuestion('');
    setTypeQuestion('single');
    setAnswers([
      {
        uuid: crypto.randomUUID(),
        text: '',
        position: 0,
        is_right: false,
      },
      {
        uuid: crypto.randomUUID(),
        text: '',
        position: 1,
        is_right: false,
      },
    ]);
  };

  const { saveQuestion } = useSaveQuestion({
    titleQuestion,
    typeQuestion,
    questions,
    answers,
    numberAnswer,
    editingQuestionUuid,
    setQuestions,
    setEditingQuestionUuid,
    resetForm,
  });

  const { saveTest } = useSaveTest({
    titleTest,
    questions,
    currentTestId,
    mode,
  });

  const { addAnswer, updateAnswer, moveDown, moveUp, deleteAnswer } = useAnswers({
    answers,
    setAnswers,
  });

  const { editQuestion, deleteQuestion } = useQuestion({
    questions,
    setIsFormQuestion,
    setEditingQuestionUuid,
    setTitleQuestion,
    setTypeQuestion,
    setAnswers,
    setQuestions,
    setNumberAnswer,
  });

  const { deleteTestById } = useDeleteTest();

  const handleDeleteQuestion = (uuid: string) => {
    setQuestionToDelete(uuid);
    setIsShowDeleteQuestionConfirm(true);
  };

  return (
    <Section>
      <Container>
        <div className={styles.wrapper}>
          <Button onClick={() => router.push('/')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <div className={styles.formContainer}>
            <div className={styles.heading}>
              <h1>{mode === 'add' ? 'Создать новый тест' : `Редактирование теста `}</h1>
              {mode === 'edit' && (
                <>
                  <Button variant="black" onClick={() => setShowDeleteTestConfirm(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </>
              )}
            </div>
            <div className={styles.block}>
              <div className={styles.name}>
                <label className={styles.label} htmlFor="name">
                  Название теста:
                </label>
                <input
                  className={styles.inputTitle}
                  maxLength={255}
                  id="name"
                  type="text"
                  value={titleTest}
                  placeholder="Основы истории"
                  onChange={(e) => setTitleTest(e.target.value)}
                />
              </div>
              <div className={styles.questions}>
                <h2>Добавленные вопросы:</h2>
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <QuestionItem
                      key={question.uuid}
                      question={question}
                      index={index}
                      handleEditQuestion={editQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  ))
                ) : (
                  <div className={styles.empty}>
                    Вопросов пока нет. Выберите тип и добавьте первый вопрос.
                  </div>
                )}
              </div>
              <QuestionTypeSelector
                typeQuestion={typeQuestion}
                onOpenFormQuestion={() => setIsFormQuestion(!isFormQuestion)}
                onTypeQuestionChange={setTypeQuestion}
              />
              <QuestionForm
                isFormOpen={isFormQuestion}
                mode={editingQuestionUuid ? 'edit' : 'add'}
                questionUuid={editingQuestionUuid || 'newQuestion'}
                titleQuestion={titleQuestion}
                typeQuestion={typeQuestion}
                answers={answers}
                numberAnswer={numberAnswer}
                setAnswers={setAnswers}
                onTitleChange={setTitleQuestion}
                onNumberAnswerChange={setNumberAnswer}
                onUpdateAnswerChange={updateAnswer}
                handleAnswerMoveUp={moveUp}
                handleAnswerMoveDown={moveDown}
                handleAnswerDelete={deleteAnswer}
                addAnswer={addAnswer}
                saveQuestion={saveQuestion}
                onCancel={() => setIsFormQuestion(false)}
              />
              <div className={styles.footer}>
                <Button variant="black" onClick={() => setShowSaveConfirm(true)}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModal
          heading="Сохранить тест?"
          message="Вы уверены, что хотите сохранить изменения?"
          isOpen={isShowSaveConfirm}
          onClose={() => setShowSaveConfirm(false)}
          onConfirm={() => {
            saveTest();
            setShowSaveConfirm(false);
          }}
        />
        <ConfirmModal
          heading="Удалить тест?"
          message="Вы уверены, что хотите удалить этот тест? Это действие нельзя отменить."
          isOpen={isShowDeleteTestConfirm}
          onClose={() => setShowDeleteTestConfirm(false)}
          onConfirm={() => {
            deleteTestById(currentTestId as string);
            setShowDeleteTestConfirm(false);
          }}
        />
        <ConfirmModal
          heading="Удалить вопрос?"
          message="Вы уверены, что хотите удалить этот вопрос? Это действие нельзя отменить."
          isOpen={isShowDeleteQuestionConfirm}
          onClose={() => setIsShowDeleteQuestionConfirm(false)}
          onConfirm={() => {
            if (questionToDelete) {
              deleteQuestion(questionToDelete);
              resetForm();
              setIsFormQuestion(false);
              setEditingQuestionUuid(null);
              setQuestionToDelete(null);
              setIsShowDeleteQuestionConfirm(false);
            }
          }}
        />
      </Container>
    </Section>
  );
};

export default TestFrom;
