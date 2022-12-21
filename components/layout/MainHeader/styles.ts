import styled from 'styled-components';
import { device } from '@/styles/device';

export const MainHeader = styled.div`
  min-height: var(--layout-page-header-h);
  display: flex;
  align-items: center;
  ${device('md')} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const IntroduceWrap = styled.div`
  margin-left: 16px;
  ${device('md')} {
    text-align: center;
    margin-left: 0px;
  }
`;

export const Title = styled.h3`
  margin-bottom: 8px;
  font-size: 1.5rem;
`;

export const Description = styled.p`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.color.gray};
`;

export const LinkList = styled.ul`
  display: flex;
  ${device('md')} {
    justify-content: center;
  }
`;

export const LinkItem = styled.li`
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;
