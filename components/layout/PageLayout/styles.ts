'use client';

import styled from 'styled-components';
import { device } from '@/styles/device';

export const Wrap = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 100%;
  width: 100%;
  grid-template-rows: auto var(--layout-footer-h);
  min-height: 100vh;

  // 모바일 환경 min-height 적용
  @supports (-webkit-touch-callout: none) {
    min-height: fill-available;
  }
`;

export const MainSection = styled.main`
  padding-top: calc(var(--layout-padding-top) + var(--layout-header-h));
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 48px;
  grid-template-columns: 100%;
  grid-template-rows: max-content;

  ${device('md')} {
    padding-left: var(--layout-side-pd);
    padding-right: var(--layout-side-pd);
  }
`;
