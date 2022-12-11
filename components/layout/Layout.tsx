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
`;
