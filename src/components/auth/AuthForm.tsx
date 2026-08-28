import Link from 'next/link';

import Section from '@components/Section';
import Container from '@components/Container';
import CustomRadio from '@components/CustomRadio';

import { useAuth } from '@/hooks/useAuth';

import styles from './AuthForm.module.scss';

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const {
    login,
    password,
    passwordConfirm,
    isAdmin,
    setLogin,
    setPassword,
    setPasswordConfirm,
    setIsAdmin,
    handleSign,
  } = useAuth(mode);

  return (
    <Section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.block}>
          <div className={styles.blockContent}>
            <h1>{mode === 'signUp' ? 'Регистрация:' : 'Авторизация:'}</h1>
            <form className={styles.form} action="">
              <div className={styles.formGroup}>
                <label htmlFor="login">Введите логин:</label>
                <input
                  type="text"
                  id="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Введите пароль:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {mode === 'signUp' && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.typeUser}>
                      <CustomRadio
                        label="Админ"
                        name="role"
                        id="admin"
                        htmlFor="admin"
                        checked={isAdmin === true}
                        onChange={() => setIsAdmin(true)}
                      />
                      <CustomRadio
                        label="Обычный пользователь"
                        name="role"
                        id="user"
                        htmlFor="user"
                        checked={isAdmin === false}
                        onChange={() => setIsAdmin(false)}
                      />
                    </div>
                  </div>
                </>
              )}
              <button type="button" onClick={handleSign}>
                {mode === 'signUp' ? 'Зарегистрироваться' : 'Войти'}
              </button>
              <Link href={mode === 'signUp' ? '/signin' : '/signup'}>
                {mode === 'signUp' ? 'Войти' : 'Зарегистрироваться'}
              </Link>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AuthForm;
