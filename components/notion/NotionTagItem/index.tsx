import React from 'react';
import Link from 'next/link';
import * as S from './styles';

export interface NotionTagItemProps {
  id?: string;
  name: string;
  color: string;
  isLink?: boolean;
}

export const NotionTagItem = ({
  name = '',
  color = 'default',
  isLink = true
}: NotionTagItemProps) => {
  const lowerName = name.toLowerCase();
  function Tag() {
    return (
      <S.Tag
        className={`notion-property-multi_select-item notion-item-${color}`}
      >
        {lowerName}
      </S.Tag>
    );
  }

  return (
    <>
      {isLink ? (
        <Link href={`/tags/${lowerName}`}>
          <Tag />
        </Link>
      ) : (
        <Tag />
      )}
    </>
  );
};
