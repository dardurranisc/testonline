import Link from 'next/link';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faListCheck,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';

import { AppDispatch } from '@/store';
import { RootState } from '@/store';
import { logOut } from '@/store/userSlice';

import Container from '@components/Container';
import Button from '@components/Button';

import styles from './Header.module.scss';

const Header = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isAuthPage = router.pathname === '/signin' || router.pathname === '/signup';

  const isAddPage = router.pathname === '/addTest';

  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap();
      router.push('/signin');
    } catch (error) {
      const err = error as { message?: string };
      alert(err?.message || 'Не удалось выйти из системы. Попробуйте позже.');
    }
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <FontAwesomeIcon icon={faListCheck} className={styles.logoImage} />
              Тесты
            </Link>
            {user && (
              <div className={styles.block}>
                <div className={styles.user}>
                  <div className={styles.role}>
                    {user.user_type === 'user' ? 'Пользователь' : 'Администратор'}
                  </div>
                  <div className={styles.login}>{user.username}</div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.auth}>
            {user?.user_type === 'admin' && !isAuthPage && !isAddPage && (
              <Link className={styles.addTestBtn} href="/addTest">
                <FontAwesomeIcon icon={faSquarePlus} className={styles.svg} />
              </Link>
            )}
            {user && (
              <Button variant="transparent" onClick={() => handleLogOut()}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.svg} />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
