export type ExceptionDetail = {
  translation_key: string;
  message: string;
};

export type ExceptionErrorField = {
  field_name: ExceptionDetail;
};

export type Exception = {
  type: string;
  message: string;
  translation_key: string;
  debug_message: string;
  details: ExceptionErrorField;
  additional_info: string;
};

export type FlatException = {
  type: string;
  message: string;
  translation_key: string;
  debug_message: string;
  details: string;
  additional_info: string;
};
