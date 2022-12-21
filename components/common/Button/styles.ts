import styled from 'styled-components';

export const Btn = styled.button`
  border-radius: 4px;
  padding: 8px;
  background-color: ${({ theme }) => theme.bgColor.button};
  color: ${({ theme }) => theme.color.button};
  cursor: pointer;
  border: 0;
`;
