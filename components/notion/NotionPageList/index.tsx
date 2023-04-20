import React from 'react';
import useSWR from 'swr';
import { Navigation } from '@/components/layout/Navigation';
import { NotionPageItem } from '@/components/notion/NotionPageItem';
import { NotionTagSideList } from '@/components/notion/NotionTagSideList';
import type { TagsObj } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { NavPageOptions } from '@/shared/types/NavPageOptions';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageListProps {
  data: ParseDatabaseItemsType[];
}

export const NotionPageList = ({ data = [] }: NotionPageListProps) => {
  const { data: pageOptions } = useSWR<NavPageOptions>('page-options');
  const { data: tags } = useSWR<TagsObj>(SwrFallbackKeys.TAGS_WITH_CNT);

  return (
    <S.Wrap>
      {data.length ? (
        <>
          {tags && Object.entries(tags || {}).length ? (
            <NotionTagSideList data={tags} />
          ) : null}
          <S.List>
            {data.map((item, idx) => (
              <S.Item key={item.id}>
                <NotionPageItem data={item} />
              </S.Item>
            ))}
          </S.List>
        </>
      ) : null}
      <Navigation options={pageOptions} />
    </S.Wrap>
  );
};
