import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { NotionTagSideList } from '@/components/notion/NotionTagSideList';
import { PostListContentProps } from './interface';
import * as S from './styles';

export const PostListContent = ({
  data,
  tags,
  pageOptions
}: PostListContentProps) => {
  const hasData = data.length > 0;
  const hasTags = tags.size > 0;

  return (
    <S.Wrap data-testid='post-list-content'>
      {hasData && (
        <>
          {hasTags && <NotionTagSideList data={tags} />}
          <NotionPageList data={data} />
        </>
      )}
      <Navigation options={pageOptions} />
    </S.Wrap>
  );
};
