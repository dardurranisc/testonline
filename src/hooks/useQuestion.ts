import { AnswerBase } from '@/types/answer';
import { QuestionBase, QuestionTypeEnum } from '@/types/question';

type UseQuestionParams = {
  questions: QuestionBase[];
  setIsFormQuestion: (value: boolean) => void;
  setEditingQuestionUuid: (uuid: string) => void;
  setTitleQuestion: (value: string) => void;
  setTypeQuestion: (value: QuestionTypeEnum) => void;
  setAnswers: (value: AnswerBase[]) => void;
  setQuestions: (value: QuestionBase[]) => void;
  setNumberAnswer: (value: string) => void;
};

export const useQuestion = ({
  questions,
  setIsFormQuestion,
  setEditingQuestionUuid,
  setTitleQuestion,
  setTypeQuestion,
  setAnswers,
  setQuestions,
  setNumberAnswer,
}: UseQuestionParams) => {
  const editQuestion = (uuid: string) => {
    setIsFormQuestion(true);
    setEditingQuestionUuid(uuid);
    const question = questions.find((q) => q.uuid === uuid);
    if (question) {
      setTitleQuestion(question.title);
      setTypeQuestion(question.question_type);
      setAnswers(question.answers || []);

      if (question.question_type === 'number' && question.answers?.length > 0) {
        setNumberAnswer(question.answers[0].text);
      } else {
        setNumberAnswer('');
      }
    }
  };

  const deleteQuestion = (uuid: string) => {
    if (questions.length === 1) {
      alert('Тест не может быть без вопросов');
      return;
    }
    const newQuestions = questions.filter((question) => question.uuid !== uuid);
    setQuestions(newQuestions);
  };

  return {
    editQuestion,
    deleteQuestion,
  };
};
