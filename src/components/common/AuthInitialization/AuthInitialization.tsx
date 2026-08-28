import { useEffect, ReactNode } from 'react';

import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { getCurrentUser } from '@/store/userSlice';

interface AuthInitializationProps {
  children: ReactNode;
}

const AuthInitialization = ({ children }: AuthInitializationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        console.error('Пользователь не авторизован:', error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitialization;
