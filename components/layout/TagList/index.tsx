import React from 'react';
import styled from 'styled-components';
import { NotionTagItem } from '@/components/notion/NotionTagItem';
import type { TagsWithCnt } from '@/shared/types/TagsWithCnt';

interface TagListProps {
  tags: TagsWithCnt;
}

export const TagList = ({ tags = [] }: TagListProps) => {
  return (
    <Wrap>
      {tags.map(({ id, name, color, cnt }) => (
        <TagItem key={id}>
          <Tag name={name} color={color} count={cnt} />
        </TagItem>
      ))}
    </Wrap>
  );
};

const Wrap = styled.ul`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 16px;
`;

const TagItem = styled.li`
  flex: 0;
`;

const Tag = styled(NotionTagItem)`
  height: auto;
`;
