import React from 'react';
import { SectionProps } from './interface';
import * as S from './styles';

export const Section = ({ children }: SectionProps) => {
  return <S.Section>{children}</S.Section>;
};
