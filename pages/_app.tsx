import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { Providers } from '@/components/Provider';
import { Seo } from '@/components/common/Seo';
import { notion } from '@/styles/notion';
import { reset } from '@/styles/reset';
import { variable } from '@/styles/variable';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  ${variable}
  ${notion}
`;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <Providers>
      <Seo />
      <Component {...pageProps} />
      <GlobalStyle />
    </Providers>
  );
}
