import React from 'react';
import { NotionPageItem } from '@/components/notion/NotionPageItem';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
  listHeight: number;
}

export const NotionPageList = ({
  data = [],
  listHeight
}: NotionPageListProps) => {
  return (
    <S.List height={listHeight}>
      {data.map((item) => (
        <S.Item key={item.id}>
          <NotionPageItem data={item} />
        </S.Item>
      ))}
    </S.List>
  );
};
