import { useRouter } from 'next/router';

import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@/store';
import { getCurrentUser } from '@/store/userSlice';

interface AuthGuardProps {
  children: ReactNode;
}

const publicRouter = ['/signin', '/signup'];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { currentUser, isStatus } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const pathName = router.pathname;
  const isPublic = publicRouter.includes(pathName);

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

  useEffect(() => {
    if (isStatus === 'default' || isStatus === 'loading') return;

    if (!currentUser && !isPublic) {
      router.push('/signin');
    }

    if (currentUser && isPublic) {
      router.push('/');
    }
  }, [currentUser, pathName, isStatus, isPublic, router]);

  if (isStatus === 'loading' || isStatus === 'default') {
    return null;
  }

  if (!currentUser && !isPublic) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
