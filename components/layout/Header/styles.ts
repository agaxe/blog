import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;
  height: var(--notion-header-height);
  min-height: var(--notion-header-height);
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(16px);
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
`;

export const Logo = styled.div`
  user-select: none;
`;
