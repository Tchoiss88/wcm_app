import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
