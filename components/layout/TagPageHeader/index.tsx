import React from 'react';
import * as S from './styles';

interface TagPageHeaderProps {
  tagName: string;
}

export const TagPageHeader = ({ tagName }: TagPageHeaderProps) => {
  return (
    <S.wrap>
      <S.Title>{tagName}</S.Title>
    </S.wrap>
  );
};
