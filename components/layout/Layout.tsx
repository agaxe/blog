import React from 'react';
import styled from 'styled-components';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Section>{children}</Section>
      <Footer />
    </div>
  );
};

const Section = styled.section`
  padding-top: calc(var(--layout-padding-top) + var(--layout-header-h));
  padding-bottom: 32px;
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  height: 100%;
  padding-left: var(--layout-side-pd);
  padding-right: var(--layout-side-pd);
`;
