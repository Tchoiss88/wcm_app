import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
