import React from 'react';
import * as S from './styles';
import config from '@/config';

export const Footer = () => {
  return (
    <S.Footer>
      <p>© ${config.name}</p>
    </S.Footer>
  );
};
