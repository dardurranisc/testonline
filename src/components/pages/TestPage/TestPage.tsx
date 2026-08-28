import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

import { useTestFinish } from '@/hooks/useTestFinish';

import { AppDispatch, RootState } from '@/store';
import { getTestById } from '@/store/testSlice';

import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';
import Modal from '@components/Modal';
import CustomRadio from '@components/CustomRadio';
import CustomNumberInput from '@components/CustomNumberInput';
import CustomSelect from '@components/CustomCheckbox';

import styles from './TestPage.module.scss';

const questionLabel = {
  single: 'Один из списка',
  multiple: 'Несколько из списка',
  number: 'Численный ответ',
};

const TestPage = () => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const test = useSelector((state: RootState) => state.test.currentTest);
  const { isResultOpen, totalQuestions, correctAnswers, setIsResultOpen, handleFinishTest } =
    useTestFinish(test, userAnswers);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    dispatch(getTestById(id.toString()));
  }, [id, dispatch]);

  return (
    <Section>
      <Container>
        <div className={styles.wrapper}>
          <Button onClick={() => router.push('/')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          {test && (
            <form className={styles.form} action="">
              <span>Прохождение теста</span>
              <h2>{test.title}</h2>
              <span>Ответьте на вопросы и завершите тест, чтобы увидеть результат</span>
              <div className={styles.main}>
                {test.questions.map((question) => (
                  <div className={styles.question} key={question.uuid}>
                    <h3>{question.title}</h3>
                    <span>{questionLabel[question.question_type]}</span>
                    <div className={styles.blockAnswers}>
                      {question.question_type === 'number' && (
                        <CustomNumberInput
                          id={question.uuid}
                          value={(userAnswers?.[question.uuid] as string) || ''}
                          onChange={(e) =>
                            setUserAnswers((prev) => ({ ...prev, [question.uuid]: e.target.value }))
                          }
                          placeholder="Введите правильный ответ"
                        />
                      )}
                      {(question.question_type === 'single' ||
                        question.question_type === 'multiple') &&
                        question.answers.map((answer) => (
                          <div key={answer.uuid}>
                            {question.question_type === 'single' ? (
                              <CustomRadio
                                htmlFor={answer.uuid}
                                name={question.uuid}
                                id={answer.uuid}
                                label={answer.text}
                                checked={userAnswers?.[question.uuid] === answer.text}
                                onChange={() => {
                                  setUserAnswers((prev) => ({
                                    ...prev,
                                    [question.uuid]: answer.text,
                                  }));
                                }}
                              />
                            ) : (
                              <CustomSelect
                                htmlFor={answer.uuid}
                                name={question.uuid}
                                id={answer.uuid}
                                label={answer.text}
                                checked={
                                  (userAnswers?.[question.uuid] as string[])?.includes(
                                    answer.text
                                  ) || false
                                }
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  setUserAnswers((prev) => {
                                    const current = (prev?.[question.uuid] as string[]) || [];
                                    if (isChecked) {
                                      return {
                                        ...prev,
                                        [question.uuid]: current.includes(answer.text)
                                          ? current
                                          : [...current, answer.text],
                                      };
                                    } else {
                                      return {
                                        ...prev,
                                        [question.uuid]: current.filter(
                                          (text) => text !== answer.text
                                        ),
                                      };
                                    }
                                  });
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleFinishTest()} className={styles.finishBtn}>
                <FontAwesomeIcon icon={faFlagCheckered} />
              </button>
            </form>
          )}
        </div>
        <Modal
          heading="Итоги тестирования"
          onClose={() => setIsResultOpen(false)}
          isOpen={isResultOpen}
        >
          <div className={styles.info}>
            <p>
              Количество правильный ответов {correctAnswers} из {totalQuestions}
            </p>
          </div>
          <div className={styles.actions}>
            <button onClick={() => router.push(`/`)}>Продолжить</button>
          </div>
        </Modal>
      </Container>
    </Section>
  );
};

export default TestPage;
