export type AnswerBase = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};

export type AnswerCreate = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};

export type AnswerCreateRequest = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};

export type AnswerUpdate = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};

export type AnswerUpdateRequest = {
  uuid: string;
  text: string;
  position: number;
  is_right: boolean;
};
