import styled from 'styled-components';

const variable = {
  gap: 32
};

export const Wrap = styled.li`
  padding-top: ${variable.gap}px;
  padding-bottom: ${variable.gap}px;
  border-bottom: 1px solid var(--color-line-gray);
  &:last-of-type {
    border-bottom: 0;
  }
`;

export const PageTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 1.8rem;
`;

export const PageDate = styled.p`
  margin-bottom: 16px;
  color: var(--color-gray);
`;
