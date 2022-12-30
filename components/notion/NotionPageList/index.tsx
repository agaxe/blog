import React from 'react';
import { usePageItems } from '@/hooks/usePageItems';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { NotionPageItem } from '../NotionPageItem';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  const { items, baseRef } = usePageItems(data);

  return (
    <>
      <S.Wrap>
        {items.map((item, idx) => (
          <NotionPageItem data={item} key={item.id} />
        ))}
      </S.Wrap>
      <div ref={baseRef} />
    </>
  );
};
