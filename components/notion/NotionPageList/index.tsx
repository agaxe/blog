import React from 'react';
import { NotionPageItem } from '@/components/notion/NotionPageItem';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  return (
    <S.List data-testid='post-list'>
      {data.map((item) => (
        <S.Item key={item.id} data-testid='post-item'>
          <NotionPageItem data={item} />
        </S.Item>
      ))}
    </S.List>
  );
};
