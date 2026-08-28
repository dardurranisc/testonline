import { validateQuestion } from '@/utils/validateQuestion';

import { QuestionBase, QuestionTypeEnum } from '@/types/question';
import { AnswerBase } from '@/types/answer';

type UseSaveQuestionParams = {
  titleQuestion: string;
  typeQuestion: QuestionTypeEnum;
  questions: QuestionBase[];
  answers: AnswerBase[];
  numberAnswer: string;
  editingQuestionUuid: string | null;
  setQuestions: (value: QuestionBase[]) => void;
  setEditingQuestionUuid: (value: string | null) => void;
  resetForm: () => void;
};

export const useSaveQuestion = ({
  titleQuestion,
  typeQuestion,
  questions,
  answers,
  numberAnswer,
  editingQuestionUuid,
  setQuestions,
  setEditingQuestionUuid,
  resetForm,
}: UseSaveQuestionParams) => {
  const saveQuestion = () => {
    const validation = validateQuestion({
      title: titleQuestion,
      type: typeQuestion,
      answers: answers,
      numberAnswer: numberAnswer,
    });

    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    let newQuestion: QuestionBase;

    if (typeQuestion === 'number') {
      const trimmed = numberAnswer.trim();

      newQuestion = {
        uuid: editingQuestionUuid || crypto.randomUUID(),
        title: titleQuestion,
        question_type: 'number',
        answers: [
          {
            uuid: crypto.randomUUID(),
            text: trimmed,
            position: 0,
            is_right: true,
          },
        ],
      };
    } else {
      newQuestion = {
        uuid: editingQuestionUuid || crypto.randomUUID(),
        title: titleQuestion,
        question_type: typeQuestion,
        answers: answers.map((answer) => ({ ...answer })),
      };
    }

    if (editingQuestionUuid) {
      setQuestions(
        questions.map((question) =>
          question.uuid === editingQuestionUuid ? newQuestion : question
        )
      );
      setEditingQuestionUuid(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
  };

  return { saveQuestion };
};
