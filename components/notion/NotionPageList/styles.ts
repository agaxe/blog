import styled from 'styled-components';

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
  ${Item}:first-child > div {
    padding-top: 0;
  }
`;
