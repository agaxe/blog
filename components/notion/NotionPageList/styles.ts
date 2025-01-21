'use client';

import styled from 'styled-components';
import { device } from '@/styles/device';

export const Wrap = styled.div`
  display: grid;
  gap: 32px;
  position: relative;
`;

export const Item = styled.li`
  border-bottom: 1px solid var(--color-line-gray);
  &:last-child {
    border-bottom: 0;
  }
`;

export const List = styled.ul`
  min-height: 100vh;

  ${Item}:first-child > div {
    padding-top: 0;
  }

  ${device('lg')} {
    min-height: auto;
  }
`;
