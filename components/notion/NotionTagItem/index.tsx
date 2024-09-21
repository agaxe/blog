import React from 'react';
import Link from 'next/link';
import { convertBlankToHyphen } from '@/utils/convertBlankToHyphen';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { NotionTagItemProps } from './interface';
import * as S from './styles';

export const NotionTagItem = ({
  className = '',
  name = '',
  color = 'default',
  isLink = true,
  size = 'lg',
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

  const tagLinkName = convertBlankToHyphen(name.toLowerCase());

  return (
    <>
      {isLink ? (
        <Link href={`/tags/${tagLinkName}/pages/1`}>
          <Tag />
        </Link>
      ) : (
        <Tag />
      )}
    </>
  );
};
