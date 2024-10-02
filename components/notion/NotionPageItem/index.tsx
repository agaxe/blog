import React from 'react';
import { NotionTagList } from '@/components/notion/NotionTagList';
import { formatDate } from '@/utils/formatDate';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import * as S from './styles';

interface NotionPageItem {
  data: ParseDatabaseItemsType;
}

export const NotionPageItem = ({ data }: NotionPageItem) => {
  const { id, title, tags, createdAt, isCompleted } = data;
  return (
    <S.Wrap>
      <S.ItemLink href={`/${id}`} />
      <S.PageTitle>{title}</S.PageTitle>
      <S.PageDate>{formatDate(createdAt)}</S.PageDate>
      <NotionTagList tags={tags} />
      {!isCompleted ? <S.CompletedBox data-testid='complete-box' /> : null}
    </S.Wrap>
  );
};
