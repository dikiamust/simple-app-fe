import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Scroll from 'react-scroll';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '../theme';

declare global {
  interface Window {
    GA_INITIALIZED: any;
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const autoScrollByHastag = () => {
    const scroller = Scroll.scroller;
    const isHastag = router.asPath.includes('#');
    if (isHastag) {
      let indexOfAsPath = router.asPath.indexOf('#');
      const hastag = router.asPath.slice(indexOfAsPath);

      scroller.scrollTo(hastag, {
        duration: 2000,
        delay: 100,
        smooth: true,
      });
    }
  };

  useEffect(() => {
    autoScrollByHastag();
  }, [router.asPath]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
