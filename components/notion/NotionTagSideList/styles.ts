import Link from 'next/link';
import styled, { css } from 'styled-components';
import { device } from '@/styles/device';
import { NotionTagSideListProps } from './interface';

const state = {
  default: css`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(calc(-100% - 72px), 0);
  `,
  fixed: css`
    position: fixed;
    left: 50%;
    top: calc(var(--layout-header-h) + 4px);
    transform: translateX(
      calc(calc(var(--layout-inner-w) * -1 / 2) - 100% - 72px)
    );
  `
};
export const List = styled.ul<Pick<NotionTagSideListProps, 'isFixed'>>`
  ${({ isFixed }) => (isFixed ? state.fixed : state.default)};
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${device('lg')} {
    display: none;
  }
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

export const Count = styled.p`
  font-size: 12px;
  color: var(--color-gray);
`;
