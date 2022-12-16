import React from 'react';
import config from '@/config';
import * as S from './styles';

export const Footer = () => {
  return (
    <S.Footer>
      <p>© {config.name}</p>
    </S.Footer>
  );
};
