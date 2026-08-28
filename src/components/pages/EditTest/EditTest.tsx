import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getTestById } from '@/store/testSlice';

import { QuestionTypeEnum, QuestionBase } from '@/types/question';
import { AnswerBase } from '@/types/answer';

import TestFrom from '@components/TestForm';

const EditTest = () => {
  const [isFormQuestion, setIsFormQuestion] = useState(false);
  const [titleTest, setTitleTest] = useState('');
  const [titleQuestion, setTitleQuestion] = useState('');
  const [typeQuestion, setTypeQuestion] = useState<QuestionTypeEnum>('single');
  const [questions, setQuestions] = useState<QuestionBase[]>([]);
  const [numberAnswer, setNumberAnswer] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const currentTest = useSelector((state: RootState) => state.test.currentTest);
  const [isLoaded, setIsLoaded] = useState(false);
  const [answers, setAnswers] = useState<AnswerBase[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(getTestById(id as string));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
    setAnswers([
      { uuid: crypto.randomUUID(), text: '', position: 0, is_right: false },
      { uuid: crypto.randomUUID(), text: '', position: 1, is_right: false },
    ]);
  }, [id, dispatch]);

  useEffect(() => {
    if (currentTest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitleTest(currentTest.title);
      setQuestions(currentTest.questions);
    }
  }, [currentTest]);

  if (!isLoaded) {
    return null;
  }

  return (
    <TestFrom
      currentTestId={id as string}
      titleTest={titleTest}
      questions={questions}
      typeQuestion={typeQuestion}
      answers={answers}
      mode="edit"
      isFormQuestion={isFormQuestion}
      titleQuestion={titleQuestion}
      numberAnswer={numberAnswer}
      setTitleTest={setTitleTest}
      setIsFormQuestion={setIsFormQuestion}
      setTitleQuestion={setTitleQuestion}
      setQuestions={setQuestions}
      setTypeQuestion={setTypeQuestion}
      setNumberAnswer={setNumberAnswer}
      setAnswers={setAnswers}
    />
  );
};

export default EditTest;
