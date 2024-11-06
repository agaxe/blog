import styled, { css } from 'styled-components';
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
  ${device('md')} {
    padding: 0 var(--layout-side-pd);
  }

  // bg style
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);
    z-index: 1;
  }
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

export const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const NavList = styled.ul``;

export const NavItem = styled.li<{ isActive: boolean }>`
  position: relative;
  font-weight: 300;
  ${({ isActive }) =>
    isActive &&
    css`
      &:after {
        position: absolute;
        display: block;
        content: ' ';
        width: 100%;
        height: 2px;
        background-color: var(--color-primary);
        bottom: -4px;
        left: 0;
      }
    `}
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  align-items: center;
`;
