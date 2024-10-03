import React, { useState } from 'react';
import useSWR from 'swr';
import { Navigation } from '@/components/layout/Navigation';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { NotionTagSideList } from '@/components/notion/NotionTagSideList';
import { useRefCurrent } from '@/hooks/useRefCurrent';
import type { TagWithCntObj } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { NavPageOptions } from '@/shared/types/NavPageOptions';
import { PostListContentProps } from './interface';
import * as S from './styles';

export const PostListContent = ({ data }: PostListContentProps) => {
  const [tagSideListHeight, setTagSideListHeight] = useState(0);
  const { data: pageOptions } = useSWR<NavPageOptions>(
    SwrFallbackKeys.PAGE_OPTIONS
  );
  const { data: tags } = useSWR<TagWithCntObj>(SwrFallbackKeys.TAGS_WITH_CNT);
  const { ref: tagSideListRef } = useRefCurrent<HTMLUListElement>((current) => {
    setTagSideListHeight(current.clientHeight);
  });

  const hasData = data.length > 0;
  const hasTags = tags && Object.entries(tags || {}).length > 0;

  return (
    <S.Wrap data-testid='post-list-content'>
      {hasData && (
        <>
          {hasTags && <NotionTagSideList data={tags} ref={tagSideListRef} />}
          <NotionPageList data={data} listHeight={tagSideListHeight} />
        </>
      )}
      <Navigation options={pageOptions} />
    </S.Wrap>
  );
};
