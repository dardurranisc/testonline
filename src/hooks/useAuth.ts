import { useRouter } from 'next/router';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { NewUser } from '@/types/user';

import { AppDispatch } from '@/store';
import { signIn, signUp } from '@/store/userSlice';

type AuthMode = 'signIn' | 'signUp';
type IsAdmin = boolean | undefined;

export const useAuth = (mode: AuthMode) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAdmin, setIsAdmin] = useState<IsAdmin>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const resetForm = () => {
    setLogin('');
    setPassword('');
    setPasswordConfirm('');
    setIsAdmin(undefined);
  };

  const handleSign = async () => {
    if (mode === 'signUp') {
      if (login.trim() === '') {
        alert('Введите пользователя!');
        return;
      }
      if (password.length < 1) {
        alert('Создайте пароль!');
        resetForm();
        return;
      }
      if (password !== passwordConfirm) {
        alert('Пароли не совпадают!');
        resetForm();
        return;
      }
      if (isAdmin === undefined) {
        alert('Выберите тип пользователя!');
        return;
      }

      const createUser: NewUser = {
        username: login,
        password,
        password_confirmation: passwordConfirm,
        is_admin: isAdmin,
      };

      try {
        await dispatch(signUp(createUser)).unwrap();
        alert('Вы успешно зарегистрировались! Теперь можете авторизоваться');
        router.push('/signin');
      } catch (error) {
        let message = 'Не удалось зарегистрироваться. Попробуйте позже.';
        if (typeof error === 'object' && error !== null) {
          const err = error as Record<string, unknown>;
          if (err.type === 'IntegrityError') {
            message = 'Пользователь с таким именем уже существует.';
          } else if (typeof err.message === 'string') {
            message = err.message;
          }
        }
        alert(message);
        resetForm();
      }
    } else {
      if (login.trim() === '' || password.trim() === '') {
        alert('Заполните все поля!');
        return;
      }

      const user = { username: login, password };
      try {
        await dispatch(signIn(user)).unwrap();
        router.push('/');
      } catch (error) {
        console.error(error);
        alert('Неправильный логин или пароль!');
        resetForm();
      }
    }
  };

  return {
    login,
    setLogin,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isAdmin,
    setIsAdmin,
    handleSign,
  };
};
