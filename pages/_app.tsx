import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { Seo } from '@/components/common/Seo';
import { notion } from '@/styles/notion';
import { reset } from '@/styles/reset';
import { theme } from '@/styles/theme';
import { variable } from '@/styles/variable';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  ${variable}
  ${notion}
  ${theme} 
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}
