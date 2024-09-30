import Link from 'next/link';
import styled from 'styled-components';
import { device } from '@/styles/device';

export const Wrap = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(calc(-100% - 72px), 0);

  ${device('lg')} {
    display: none;
  }
`;

export const List = styled.ul`
  display: grid;
  gap: 16px;
`;

export const Item = styled.li``;

export const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.p`
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Count = styled.span`
  font-size: 12px;
  color: var(--color-gray);
`;
