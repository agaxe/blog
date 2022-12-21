import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { ThemeContext } from '@/shared/context';
import { dark, light } from '@/styles/theme';

export const Providers = ({ children }: any) => {
  const [theme, toggleTheme] = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};
