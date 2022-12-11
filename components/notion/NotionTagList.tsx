import React from 'react';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTagItem } from './NotionTagItem';

interface NotionTagListProps {
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

export const NotionTagList = ({ tags }: NotionTagListProps) => {
  return (
    <ul>
      <li>
        <span className='notion-property notion-property-multi_select'>
          {tags.map((item) => (
            <NotionTagItem key={item.id} name={item.name} color={item.color} />
          ))}
        </span>
      </li>
    </ul>
  );
};
