import styled from 'styled-components';

export const Section = styled.section`
  padding-top: calc(var(--layout-padding-top) + var(--layout-header-h));
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 48px;
  min-height: 100vh;
`;
