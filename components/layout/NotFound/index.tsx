import React from 'react';
import * as S from './styles';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export const NotFound = () => {
  return (
    <S.Wrap>
      <S.ContentBox>
        <S.Title>404</S.Title>
        <S.Desc>Page Not Found</S.Desc>
        <Button>
          <Link href='/'>Back to Home</Link>
        </Button>
      </S.ContentBox>
    </S.Wrap>
  );
};
