import styled from 'styled-components';

export const wrap = styled.div`
  min-height: var(--layout-page-header-h);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-line-gray);
`;

export const Title = styled.h2`
  max-width: 80%;
  text-align: center;
  flex: 0 1 auto;
  word-break: break-word;
  font-size: 2rem;
`;