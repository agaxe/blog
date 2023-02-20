import styled from 'styled-components';

export const Btn = styled.button`
  border-radius: 4px;
  padding: 8px;
  background-color: var(--color-bg-reverse);
  color: var(--color-default-reverse);
  cursor: pointer;
  border: 0;
  transition: background-color 0.4s;
  &:hover {
    background-color: var(--color-gray-hover);
  }
`;
