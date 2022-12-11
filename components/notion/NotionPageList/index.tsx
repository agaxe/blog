import React from 'react';
import { NotionPageItem } from '../NotionPageItem';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  return (
    <S.Wrap>
      {data.map((item, idx) => (
        <li key={item.id}>
          <NotionPageItem data={item} />
          {idx !== data.length - 1 && <S.Line />}
        </li>
      ))}
    </S.Wrap>
  );
};
