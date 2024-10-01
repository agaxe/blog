import styled, { css } from 'styled-components';
import { NotionTagItemProps } from './interface';

const sizes = {
  lg: css`
    font-size: 16px;
    padding: 6px;
    border-radius: 5px;
  `
};

export const Tag = styled.div<Pick<NotionTagItemProps, 'size'>>`
  font-size: 14px;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: auto;
  &:hover {
    opacity: 0.7;
  }
  ${({ size }) => size && sizes[size]}
`;

export const Name = styled.p``;

export const Count = styled.span`
  font-size: 14px;
  color: var(--color-gray);
`;
