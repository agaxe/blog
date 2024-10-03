import React, { ForwardedRef, forwardRef } from 'react';
import { convertBlankToHyphen } from '@/utils/convertBlankToHyphen';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { NotionTagSideListProps } from './interface';
import * as S from './styles';

export const NotionTagSideList = forwardRef(
  ({ data }: NotionTagSideListProps, ref?: ForwardedRef<HTMLUListElement>) => {
    return (
      <S.Wrap data-testid='side-tag-list'>
        <S.List ref={ref}>
          {Object.entries(data).map(([key, value]) => (
            <S.Item key={key}>
              <S.ItemLink href={`/tags/${convertBlankToHyphen(key)}/pages/1`}>
                <S.Title>{convertPascalCase(key)}</S.Title>
                <S.Count>({value})</S.Count>
              </S.ItemLink>
            </S.Item>
          ))}
        </S.List>
      </S.Wrap>
    );
  }
);

NotionTagSideList.displayName = 'NotionTagSideList';
