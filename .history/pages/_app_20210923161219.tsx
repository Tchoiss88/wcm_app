import { AppProps } from 'next/app';
import { FC } from 'react';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import Layout from '../src/layout/Layout';
import theme from '../lib/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   // Remove the server-side injected css
  //   const jssStyles = document.querySelector('#jss-server-side-styles');
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // }, []);
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default MyApp;
