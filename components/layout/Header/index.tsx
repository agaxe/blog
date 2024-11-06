import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from '@/components/Search';
import { Theme } from '@/components/Theme';
import { useStickyHeader } from './hooks/useStickyHeader';
import * as S from './styles';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const { pathname } = useRouter();
  const { isSticky } = useStickyHeader();

  return (
    <S.Header className={className} isSticky={isSticky}>
      <S.Inner>
        <S.Logo>
          <Link href='/'>
            <S.LogoTitle>Blog.</S.LogoTitle>
          </Link>
        </S.Logo>
        <S.Nav>
          <S.NavList>
            <S.NavItem isActive={pathname === '/tags'}>
              <Link href='/tags'>Tags</Link>
            </S.NavItem>
          </S.NavList>
          <S.ButtonGroup>
            <Theme />
            <Search />
          </S.ButtonGroup>
        </S.Nav>
      </S.Inner>
    </S.Header>
  );
};
