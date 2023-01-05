import React from 'react';
import Link from 'next/link';
import { Search } from '@/components/Search';
import { Theme } from '@/components/Theme';
import { useStickyHeader } from './hooks/useStickyHeader';
import * as S from './styles';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const { isSticky } = useStickyHeader();

  return (
    <S.Header className={className} isSticky={isSticky}>
      <S.Inner>
        <S.Logo>
          <Link href='/'>
            <S.LogoTitle>Blog.</S.LogoTitle>
          </Link>
        </S.Logo>
        <S.ButtonGroup>
          <Theme />
          <Search />
        </S.ButtonGroup>
      </S.Inner>
      <S.Bg />
    </S.Header>
  );
};
