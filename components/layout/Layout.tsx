import React from 'react';
import styled from 'styled-components';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
  padding-top: 32px;
  padding-bottom: 32px;
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  height: 100%;
  padding-left: var(--layout-side-pd);
  padding-right: var(--layout-side-pd);
`;
