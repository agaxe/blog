import React, { ForwardedRef, forwardRef } from 'react';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { NotionTagSideListProps } from './interface';
import * as S from './styles';

export const NotionTagSideList = forwardRef(
  (
    { data, isFixed }: NotionTagSideListProps,
    ref?: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <S.List ref={ref} isFixed={isFixed}>
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
