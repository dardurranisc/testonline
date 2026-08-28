import { AnswerBase } from '@/types/answer';

type UseAnswersParams = {
  answers: AnswerBase[];
  setAnswers: (value: AnswerBase[]) => void;
};

export const useAnswers = ({ answers, setAnswers }: UseAnswersParams) => {
  const addAnswer = () => {
    const newAnswer = {
      uuid: crypto.randomUUID(),
      text: '',
      position: answers.length,
      is_right: false,
    };
    setAnswers([...answers, newAnswer]);
  };

  const updateAnswer = (uuid: string, field: string, value: string | boolean) => {
    const update = answers.map((answer) =>
      answer.uuid === uuid ? { ...answer, [field]: value } : answer
    );
    setAnswers(update);
  };

  const moveUp = (position: number) => {
    if (position === 0) return;
    const newAnswers = [...answers];
    [newAnswers[position], newAnswers[position - 1]] = [
      newAnswers[position - 1],
      newAnswers[position],
    ];
    newAnswers.forEach((a, i) => (a.position = i));
    setAnswers(newAnswers);
  };

  const moveDown = (position: number) => {
    if (position === answers.length - 1) return;
    const newAnswers = [...answers];
    [newAnswers[position], newAnswers[position + 1]] = [
      newAnswers[position + 1],
      newAnswers[position],
    ];
    newAnswers.forEach((a, i) => (a.position = i));
    setAnswers(newAnswers);
  };

  const deleteAnswer = (uuid: string) => {
    if (answers.length <= 2) {
      alert('Количество ответов в данном типе вопроса не может быть меньше двух');
      return;
    }
    const newAnswers = answers.filter((answer) => answer.uuid !== uuid);
    newAnswers.forEach((a, i) => (a.position = i));
    setAnswers(newAnswers);
  };

  return {
    addAnswer,
    updateAnswer,
    moveDown,
    moveUp,
    deleteAnswer,
  };
};
