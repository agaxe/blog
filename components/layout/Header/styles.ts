import styled from 'styled-components';
import { device } from '@/styles/device';

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;
  height: var(--notion-header-height);
  min-height: var(--notion-header-height);
  background: var(--color-bg-header);
`;

export const Bg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(16px);
  z-index: 1;
`;

export const Inner = styled.div`
  height: 100%;
  width: var(--layout-inner-w);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: var(--layout-side-pd);
  padding-right: var(--layout-side-pd);
  position: relative;
  z-index: 5;
  ${device('md')} {
    width: 100%;
  }
`;

export const Logo = styled.div`
  user-select: none;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  align-items: center;
`;
