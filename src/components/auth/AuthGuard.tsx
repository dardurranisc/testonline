import { useRouter } from 'next/router';

import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

interface AuthGuardProps {
  children: ReactNode;
}

const publicRouter = ['/signin', '/signup'];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { currentUser, isStatus } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const pathName = router.pathname;
  const isPublic = publicRouter.includes(pathName);

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
