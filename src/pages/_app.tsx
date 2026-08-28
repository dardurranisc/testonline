import Head from 'next/head';
import Script from 'next/script';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import Layout from '@/components/common/Layout';
import AuthInitialization from '@/components/common/AuthInitialization';
import { AuthGuard } from '@/components/auth';

import store from '@/store';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <AuthInitialization>
          <AuthGuard>
            <Layout>
              <Head>
                <title>Тесты</title>
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/images/favicon/favicon.ico"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </Head>
              <Script src="https://kit.fontawesome.com/5cbc17f9ae.js" crossOrigin="anonymous" />
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        </AuthInitialization>
      </Provider>
    </>
  );
}
