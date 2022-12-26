import styled from 'styled-components';

const variable = {
  gap: 32
};

export const Wrap = styled.div``;

export const Line = styled.hr`
  border: 0;
  height: 1px;
  background-color: var(--color-line-gray);
  margin-top: ${variable.gap}px;
  margin-bottom: ${variable.gap}px;
`;
