import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { Analytics } from '@/components/Analytics';
import { Seo } from '@/components/common/Seo';
import { useScrollValue } from '@/hooks/useScrollValue';
import { global } from '@/styles/global';
import { notion } from '@/styles/notion';
import { reset } from '@/styles/reset';
import { Theme } from '@/styles/theme';
import { variable } from '@/styles/variable';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  ${variable}
  ${Theme}
  ${global}
  ${notion}
`;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useScrollValue();

  return (
    <>
      <Seo />
      <Analytics />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}
