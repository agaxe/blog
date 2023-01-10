import React from 'react';
import Link from 'next/link';
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
      <Link href={`/${id}`}>
        <S.Link>
          <S.PageTitle>{title}</S.PageTitle>
        </S.Link>
      </Link>
      <S.PageDate>{formatDate(createdAt)}</S.PageDate>
      <NotionTagList tags={tags} />
      {!isCompleted ? <S.CompletedBox /> : null}
    </S.Wrap>
  );
};
