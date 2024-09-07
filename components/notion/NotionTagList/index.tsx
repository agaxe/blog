import React from 'react';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import styled from 'styled-components';
import { NotionTagItem } from '../NotionTagItem';

interface NotionTagListProps {
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

export const NotionTagList = ({ tags }: NotionTagListProps) => {
  return (
    <NotionTagListWrap>
      {tags.map((item) => (
        <li key={item.id}>
          <span>
            <NotionTagItem name={item.name} color={item.color} />
          </span>
        </li>
      ))}
    </NotionTagListWrap>
  );
};

const NotionTagListWrap = styled.ul`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  width: fit-content;
  position: relative;
  z-index: 2;
`;
