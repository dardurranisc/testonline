import { AnswerBase } from '@/types/answer';
import { QuestionTypeEnum } from '@/types/question';

type ValidateQuestionParams = {
  title: string;
  type: QuestionTypeEnum;
  answers: AnswerBase[];
  numberAnswer: string;
};

export const validateQuestion = ({
  title,
  type,
  answers,
  numberAnswer,
}: ValidateQuestionParams) => {
  if (title.trim() === '') {
    return { isValid: false, error: 'Вы должны ввести название вопроса' };
  }

  if (type === 'single') {
    const correctAnswer = answers.filter((answer) => answer.is_right).length;
    if (answers.length < 2) {
      return { isValid: false, error: 'Должно быть не менее двух вариантов ответа' };
    }
    if (correctAnswer === 0) {
      return { isValid: false, error: 'Должен быть только один правильный ответ' };
    }
    if (correctAnswer > 1) {
      return { isValid: false, error: 'Не может быть больше одного правильного ответа' };
    }
  }

  if (type === 'multiple') {
    const correctAnswer = answers.filter((answer) => answer.is_right).length;
    if (answers.length < 2) {
      return { isValid: false, error: 'Должно быть не менее двух вариантов ответа' };
    }
    if (correctAnswer < 2) {
      return { isValid: false, error: 'Не должно быть меньше двух правильных ответов' };
    }
  }

  if (type === 'number') {
    const trimmed = numberAnswer.trim();

    if (trimmed === '' || isNaN(Number(trimmed))) {
      return { isValid: false, error: 'Введите численный ответ' };
    }
  }

  return { isValid: true };
};
