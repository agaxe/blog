import styled from 'styled-components';
import { device } from '@/styles/device';

export const Section = styled.div`
  padding-top: calc(var(--layout-padding-top) + var(--layout-header-h));
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 48px;
  min-height: 100vh;
  grid-template-columns: 100%;

  ${device('md')} {
    padding-left: var(--layout-side-pd);
    padding-right: var(--layout-side-pd);
  }
`;
