import React from 'react';
import * as S from './styles';

interface TagHeaderProps {
  tagName: string;
}

export const TagHeader = ({ tagName }: TagHeaderProps) => {
  return (
    <S.wrap>
      <S.Title>{tagName}</S.Title>
    </S.wrap>
  );
};
