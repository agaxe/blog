import type { AppProps } from 'next/app';
import { Seo } from '@/components/common/Seo';
import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';
import 'styles/index.scss';
import 'styles/notion.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Component {...pageProps} />
    </>
  );
}
