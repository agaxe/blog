import styled, { css } from 'styled-components';
import { NotionTagItemProps } from './interface';

const sizes = {
  large: css`
    font-size: 16px;
    padding: 6px;
    border-radius: 5px;
  `
};

export const Tag = styled.div<Pick<NotionTagItemProps, 'size'>>`
  font-size: 14px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  ${({ size }) => size && sizes[size]}
`;
