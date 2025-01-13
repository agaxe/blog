import React from 'react';
import type { TagsWithCnt } from '@/shared/types/TagsWithCnt';
import * as S from './styles';

interface TagListProps {
  tags: TagsWithCnt;
}

export const TagList = ({ tags = [] }: TagListProps) => {
  return (
    <S.Wrap>
      {tags.map(({ id, name, color, cnt }) => (
        <S.TagItem key={id}>
          <S.Tag name={name} color={color} count={cnt} />
        </S.TagItem>
      ))}
    </S.Wrap>
  );
};
