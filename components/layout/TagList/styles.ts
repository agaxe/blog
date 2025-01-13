'use client';

import styled from 'styled-components';
import { NotionTagItem } from '@/components/notion/NotionTagItem';

export const Wrap = styled.ul`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 16px;
`;

export const TagItem = styled.li`
  flex: 0;
`;

export const Tag = styled(NotionTagItem)`
  height: auto;
`;
