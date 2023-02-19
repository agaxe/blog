import React from 'react';
import useSWR from 'swr';
import { Navigation } from '@/components/layout/Navigation';
import { NotionPageItem } from '@/components/notion/NotionPageItem';
import { NavPageOptionsType } from '@/shared/types';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  const { data: pageOptions } = useSWR<NavPageOptionsType>('page-options');

  return (
    <S.Wrap>
      {data.length ? (
        <S.List>
          {data.map((item, idx) => (
            <S.Item key={item.id}>
              <NotionPageItem data={item} />
            </S.Item>
          ))}
          <Navigation options={pageOptions} />
        </S.List>
      ) : null}
    </S.Wrap>
  );
};
