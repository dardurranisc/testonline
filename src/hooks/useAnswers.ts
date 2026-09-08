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
    const updatedAnswers = newAnswers.map((a, i) => ({ ...a, position: i }));
    setAnswers(updatedAnswers);
  };

  const moveDown = (position: number) => {
    if (position === answers.length - 1) return;
    const newAnswers = [...answers];
    [newAnswers[position], newAnswers[position + 1]] = [
      newAnswers[position + 1],
      newAnswers[position],
    ];
    const updatedAnswers = newAnswers.map((a, i) => ({ ...a, position: i }));
    setAnswers(updatedAnswers);
  };

  const deleteAnswer = (uuid: string) => {
    if (answers.length <= 2) {
      alert('Количество ответов в данном типе вопроса не может быть меньше двух');
      return;
    }
    const filtered = answers.filter((a) => a.uuid !== uuid);
    const updated = filtered.map((a, i) => ({ ...a, position: i }));
    setAnswers(updated);
  };

  return {
    addAnswer,
    updateAnswer,
    moveDown,
    moveUp,
    deleteAnswer,
  };
};
