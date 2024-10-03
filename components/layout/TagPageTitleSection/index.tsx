import React from 'react';
import * as S from './styles';

interface TagPageTitleSectionProps {
  tagName: string;
}

export const TagPageTitleSection = ({ tagName }: TagPageTitleSectionProps) => {
  return (
    <S.wrap data-testid='tag-page-title-section'>
      <S.Title>{tagName}</S.Title>
    </S.wrap>
  );
};
