import React, { useContext } from 'react';
import { ThemeContext } from '@/shared/context';
import * as S from './styles';

export const Theme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {theme && (
        <S.Theme>
          <S.Button onClick={() => toggleTheme()}>
            {theme === 'dark' ? (
              <S.LightIcon name='sun' />
            ) : (
              <S.DarkIcon name='moon' />
            )}
          </S.Button>
        </S.Theme>
      )}
    </>
  );
};
