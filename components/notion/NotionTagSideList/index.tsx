import React from 'react';
import { convertBlankToHyphen } from '@/utils/convertBlankToHyphen';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { NotionTagSideListProps } from './interface';
import * as S from './styles';

export const NotionTagSideList = ({ data }: NotionTagSideListProps) => {
  return (
    <S.Wrap data-testid='side-tag-list'>
      <S.List>
        {[...data].map(([key, value]) => (
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
};
