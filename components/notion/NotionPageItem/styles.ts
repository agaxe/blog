import Link from 'next/link';
import styled from 'styled-components';

export const Wrap = styled.div``;

export const PageTitle = styled.h3`
  font-size: 1.8rem;
  transition: color 0.3s;
`;

export const PageDate = styled.p`
  margin: 24px 0 16px 0;
  color: var(--color-gray);
`;

export const CompletedBox = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  width: 5px;
  height: calc(100% - 32px * 2);
  transform: translate(0, -50%);
  background-color: #fab005;
`;

export const ItemLink = styled(Link)`
  display: block;
  padding-top: 32px;
  padding-bottom: 32px;
  position: relative;

  &:hover {
    ${PageTitle} {
      color: var(--color-gray-hover);
    }
  }
`;
