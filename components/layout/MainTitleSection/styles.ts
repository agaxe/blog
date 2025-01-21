'use client';

import styled from 'styled-components';
import { Icon } from '@/components/common/Icon';
import { device } from '@/styles/device';

export const IntroduceSection = styled.section`
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
  color: var(--color-gray);
`;

export const LinkList = styled.ul`
  display: flex;
  align-items: center;
  ${device('md')} {
    justify-content: center;
  }
`;

export const LinkItem = styled.li`
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

export const SnsLink = styled.a``;

export const SnsIcon = styled(Icon)`
  width: var(--size-header-icon-w);
  path {
    transition: fill 0.4s;
    fill: var(--color-default);
  }
  &:hover {
    path {
      fill: var(--color-gray-hover);
    }
  }
`;
