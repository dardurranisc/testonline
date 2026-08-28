export type UserTypeEnum = 'admin' | 'user';

export type CurrentUser = {
  id: number;
  username: string;
  user_type: UserTypeEnum;
};

export type NewUser = {
  username: string;
  password: string;
  password_confirmation: string;
  is_admin: boolean;
};

export type UserBase = {
  id: number;
  username: string;
  user_type: UserTypeEnum;
};
