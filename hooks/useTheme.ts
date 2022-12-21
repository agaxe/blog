import { useCallback, useEffect, useState } from 'react';

type themeType = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState('');

  const changeTheme = useCallback((theme: themeType) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }, []);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme);
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      changeTheme('dark');
    } else {
      changeTheme('light');
    }
  }, [changeTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
  }, [theme, changeTheme]);

  return [theme, toggleTheme] as const;
};
