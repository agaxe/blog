import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import * as S from './styles';

export const Theme = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <S.Theme>
      <S.Button onClick={toggleTheme}>
        {theme === 'dark' ? (
          <S.LightIcon name='sun' />
        ) : (
          <S.DarkIcon name='moon' />
        )}
      </S.Button>
    </S.Theme>
  );
};
