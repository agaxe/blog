import React from 'react';
import * as S from './styles';

export const NotFound = () => {
  return (
    <S.Wrap>
      <S.ContentBox>
        <S.Title>404</S.Title>
        <S.Desc>Page Not Found</S.Desc>
        <S.HomeBtn>
          <S.HomeBtnLink href='/'>Back to Home</S.HomeBtnLink>
        </S.HomeBtn>
      </S.ContentBox>
    </S.Wrap>
  );
};
