import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import * as S from './styles';

export const Theme = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <S.Theme>
      <S.Button onClick={toggleTheme} data-testid='theme-btn'>
        {theme === 'dark' ? (
          <S.LightIcon name='sun' />
        ) : (
          <S.DarkIcon name='moon' />
        )}
      </S.Button>
    </S.Theme>
  );
};
