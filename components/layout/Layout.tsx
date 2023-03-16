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
  grid-template-columns: 100%;
  width: 100%;
  grid-template-rows: auto var(--layout-footer-h);
  min-height: 100vh;

  // 모바일 환경 min-height 적용
  @supports (-webkit-touch-callout: none) {
    min-height: fill-available;
  }
`;
