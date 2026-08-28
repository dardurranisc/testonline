import { useState } from 'react';

import { TestRetrieve } from '@/types/test';

export const useTestFinish = (
  test: TestRetrieve | null,
  userAnswers: Record<string, string | string[]>
) => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const handleFinishTest = () => {
    if (!test) return;

    const allAnswers = test.questions.length;
    const allAnswered = userAnswers ? Object.keys(userAnswers).length : 0;

    if (allAnswers !== allAnswered) {
      alert('Нужно ответить на все вопросы');
      return;
    }

    let correct = 0;

    test.questions.forEach((question) => {
      const userAnswer = userAnswers?.[question.uuid];
      if (question.question_type === 'single') {
        const correctAnswer = question.answers.find((answer) => answer.is_right)?.text;
        if (correctAnswer === userAnswer) correct++;
      } else if (question.question_type === 'multiple') {
        const correctTexts = question.answers
          .filter((answer) => answer.is_right)
          .map((answer) => answer.text);
        const userTexts = (userAnswer as string[]) || [];
        const isCorrect =
          userTexts.length === correctTexts.length &&
          correctTexts.every((text) => userTexts.includes(text));
        if (isCorrect) correct++;
      } else {
        const correctNumber = question.answers[0].text;
        if (userAnswer === correctNumber) correct++;
      }
    });

    setTotalQuestions(allAnswers);
    setCorrectAnswers(correct);
    setIsResultOpen(true);
  };

  return { isResultOpen, totalQuestions, correctAnswers, setIsResultOpen, handleFinishTest };
};
