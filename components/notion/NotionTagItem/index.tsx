import React from 'react';
import Link from 'next/link';
import { NotionTagItemProps } from './interface';
import * as S from './styles';

export const NotionTagItem = ({
  className = '',
  name = '',
  color = 'default',
  isLink = true,
  size
}: NotionTagItemProps) => {
  const lowerName = name.toLowerCase();

  function Tag() {
    return (
      <S.Tag
        className={`${className} notion-property-multi_select-item notion-item-${color}`}
        size={size}
      >
        {lowerName}
      </S.Tag>
    );
  }

  return (
    <>
      {isLink ? (
        <Link href={`/tags/${lowerName}/pages/1`}>
          <Tag />
        </Link>
      ) : (
        <Tag />
      )}
    </>
  );
};
