import { useEffect, useState } from 'react';

import TestFrom from '@components/TestForm';

import { QuestionBase, QuestionTypeEnum } from '@/types/question';
import { AnswerBase } from '@/types/answer';

const AddTest = () => {
  const [isFormQuestion, setIsFormQuestion] = useState(false);
  const [titleTest, setTitleTest] = useState('');
  const [titleQuestion, setTitleQuestion] = useState('');
  const [typeQuestion, setTypeQuestion] = useState<QuestionTypeEnum>('single');
  const [questions, setQuestions] = useState<QuestionBase[]>([]);
  const [numberAnswer, setNumberAnswer] = useState<string>('');

  const [isLoaded, setIsLoaded] = useState(false);
  const [answers, setAnswers] = useState<AnswerBase[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
    setAnswers([
      { uuid: crypto.randomUUID(), text: '', position: 0, is_right: false },
      { uuid: crypto.randomUUID(), text: '', position: 1, is_right: false },
    ]);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <TestFrom
      titleTest={titleTest}
      questions={questions}
      typeQuestion={typeQuestion}
      answers={answers}
      mode="add"
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

export default AddTest;
