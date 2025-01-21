import React from 'react';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTagItem } from '../NotionTagItem';
import * as S from './styles';

interface NotionTagListProps {
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

export const NotionTagList = ({ tags }: NotionTagListProps) => {
  return (
    <S.NotionTagListWrap>
      {tags.map((item) => (
        <li key={item.id}>
          <span>
            <NotionTagItem name={item.name} color={item.color} />
          </span>
        </li>
      ))}
    </S.NotionTagListWrap>
  );
};
