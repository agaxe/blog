'use client';

import styled from 'styled-components';

const variables = {
  pd: '40px'
};

export const Footer = styled.footer`
  width: 100%;
  padding-top: ${variables.pd};
  padding-bottom: ${variables.pd};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  color: #aaa;
  border-top: 1px solid var(--color-line-gray);
  height: var(--layout-footer-h);
`;
