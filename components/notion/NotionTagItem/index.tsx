import React from 'react';
import Link from 'next/link';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { NotionTagItemProps } from './interface';
import * as S from './styles';

export const NotionTagItem = ({
  className = '',
  name = '',
  color = 'default',
  isLink = true,
  size,
  count = 0
}: NotionTagItemProps) => {
  function Tag() {
    return (
      <S.Tag
        className={`${className} notion-property-multi_select-item notion-item-${color}`}
        size={size}
      >
        <S.Name>{convertPascalCase(name)}</S.Name>
        {count !== 0 && <S.Count>({count})</S.Count>}
      </S.Tag>
    );
  }

  return (
    <>
      {isLink ? (
        <Link href={`/tags/${name.toLowerCase()}/pages/1`}>
          <Tag />
        </Link>
      ) : (
        <Tag />
      )}
    </>
  );
};
