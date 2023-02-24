import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  gap: 32px;
`;

export const List = styled.ul``;

export const Item = styled.li`
  border-bottom: 1px solid var(--color-line-gray);
  &:last-child {
    border-bottom: 0;
  }
`;
