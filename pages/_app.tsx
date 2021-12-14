import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import Layout from '../src/layout/Layout';
import theme from '../lib/theme';
import { Provider as AuthProvider } from 'next-auth/client';
import rootReducer from '../src/redux/reducer';
import useStore from 'lib/store';

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const setStock = useStore((state) => state.setStock);
  const setOrders = useStore((state) => state.setOrders);

  React.useEffect(() => {
    const dataFromDB = async () => {
      const dataItems = await (
        await fetch('http://localhost:3000/api/item')
      ).json();

      setStock(dataItems);

      const dataOrders = await await (
        await fetch('http://localhost:3000/api/order')
      ).json();

      setOrders(dataOrders);
    };

    dataFromDB();
  }, []);

  //
  return (
    <>
      <Head>
        <title>WCM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <AuthProvider session={pageProps.session}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}
export default MyApp;
