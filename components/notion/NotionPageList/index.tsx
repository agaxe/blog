import React from 'react';
import { NotionPageItem } from '@/components/notion/NotionPageItem';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { NotionPageListSkeleton } from './Skeleton';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  return (
    <>
      {data.length ? (
        <S.Wrap>
          {data.map((item, idx) => (
            <S.Item key={item.id}>
              <NotionPageItem data={item} />
            </S.Item>
          ))}
        </S.Wrap>
      ) : (
        <div>
          <NotionPageListSkeleton />
        </div>
      )}
    </>
  );
};
