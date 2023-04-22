import React, { ForwardedRef, forwardRef } from 'react';
import type { TagsObj } from '@/lib/notion/tags/getTagsWithPostCnt';
import { convertPascalCase } from '@/utils/convertPascalCase';
import * as S from './styles';

interface NotionTagSideListProps {
  data: TagsObj;
}

export const NotionTagSideList = forwardRef(
  ({ data }: NotionTagSideListProps, ref?: ForwardedRef<HTMLUListElement>) => {
    return (
      <S.List ref={ref}>
        {Object.entries(data).map(([key, value]) => (
          <S.Item key={key}>
            <S.ItemLink href={`/tags/${key}/pages/1`}>
              <S.Title>{convertPascalCase(key)}</S.Title>
              <S.Count>({value})</S.Count>
            </S.ItemLink>
          </S.Item>
        ))}
      </S.List>
    );
  }
);

NotionTagSideList.displayName = 'NotionTagSideList';
