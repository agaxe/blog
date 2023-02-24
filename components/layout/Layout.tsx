import React from 'react';
import styled from 'styled-components';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Section } from '@/components/layout/Section';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrap>
      <Header />
      <Section>{children}</Section>
      <Footer />
    </Wrap>
  );
};

export const Wrap = styled.div`
  display: grid;
  gap: 32px;
  width: 100%;
`;
