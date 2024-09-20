import React from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageLayoutProps } from './interface';
import * as S from './styles';

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <S.Wrap>
      <Header />
      <S.MainSection>{children}</S.MainSection>
      <Footer />
    </S.Wrap>
  );
};
