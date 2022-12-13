import styled from 'styled-components';

export const MainHeader = styled.div`
  min-height: var(--layout-page-header-h);
  display: flex;
  align-items: center;
`;

export const IntroduceWrap = styled.div`
  margin-left: 8px;
`;

export const Title = styled.h3`
  margin-bottom: 8px;
  font-size: 1.5rem;
`;

export const Description = styled.p`
  margin-bottom: 16px;
  color: #666;
`;

export const LinkList = styled.ul`
  display: flex;
`;

export const LinkItem = styled.li`
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;
