import React from 'react';
import Link from 'next/link';
import { Search } from '@/components/Search';
import { Theme } from '@/components/Theme';
import * as S from './styles';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <S.Header className={className}>
      <S.Inner>
        <S.Logo>
          <Link href='/'>
            <h2>Blog.</h2>
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
