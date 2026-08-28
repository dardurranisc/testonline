import { AnswerBase } from './answer';

export type QuestionTypeEnum = 'single' | 'multiple' | 'number';

export type QuestionBase = {
  uuid: string;
  title: string;
  question_type: QuestionTypeEnum;
  answers: AnswerBase[];
};

export type QuestionCreate = {
  uuid: string;
  title: string;
  question_type: QuestionTypeEnum;
  answers: AnswerBase[];
};

export type QuestionCreateRequest = {
  uuid: string;
  title: string;
  question_type: QuestionTypeEnum;
  answers: AnswerBase[];
};

export type QuestionUpdate = {
  uuid: string;
  title: string;
  question_type: QuestionTypeEnum;
  answers: AnswerBase[];
};

export type QuestionUpdateRequest = {
  uuid: string;
  title: string;
  question_type: QuestionTypeEnum;
  answers: AnswerBase[];
};
