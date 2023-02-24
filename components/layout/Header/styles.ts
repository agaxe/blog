import styled from 'styled-components';
import { device } from '@/styles/device';

export const Header = styled.header<{ isSticky: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: var(--layout-header-h);
  min-height: var(--layout-header-h);
  background: var(--color-bg-header);
  margin-top: ${({ isSticky }) =>
    isSticky ? 0 : `calc(var(--layout-header-h) * -1)`};
  transition: margin-top 0.4s;
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
  position: relative;
  z-index: 5;
  ${device('md')} {
    width: 100%;
  }
`;

export const Logo = styled.div`
  user-select: none;
`;

export const LogoTitle = styled.h2`
  font-size: 1.5rem;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  align-items: center;
`;
