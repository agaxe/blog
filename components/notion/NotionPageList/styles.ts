import styled from 'styled-components';

const variable = {
  gap: 32
};

export const Wrap = styled.div``;

export const Line = styled.hr`
  border: 0;
  height: 1px;
  background-color: var(--fg-color-0);
  margin-top: ${variable.gap}px;
  margin-bottom: ${variable.gap}px;
`;
