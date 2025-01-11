'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { global } from '@/styles/global';
import { notion } from '@/styles/notion';
import { reset } from '@/styles/reset';
import { Theme } from '@/styles/theme';
import { variable } from '@/styles/variable';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  ${variable}
  ${Theme}
  ${global}
  ${notion}
`;

export default function StyledComponentsRegistry({
  children
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalStyle />
      {children}
    </StyleSheetManager>
  );
}
