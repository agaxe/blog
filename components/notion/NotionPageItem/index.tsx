import React from 'react';
import Link from 'next/link';
import { NotionTagList } from '@/components/notion/NotionTagList';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { formatDate } from '@/utils/formatDate';
import * as S from './styles';

interface NotionPageItem {
  data: ParseDatabaseItemsType;
}

export const NotionPageItem = ({ data }: NotionPageItem) => {
  const { id, title, tags, createdAt } = data;

  return (
    <S.Wrap>
      <Link href={`/post/${id}`}>
        <S.PageTitle>{title}</S.PageTitle>
      </Link>
      <S.PageDate>{formatDate(createdAt)}</S.PageDate>
      <NotionTagList tags={tags} />
    </S.Wrap>
  );
};
