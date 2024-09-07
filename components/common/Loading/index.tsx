import React from 'react';
import * as S from './styles';

export interface LoadingProps {
  isShow: boolean;
}

export const Loading = ({ isShow }: LoadingProps) => {
  return (
    <S.Wrap role='loading' isShow={isShow}>
      <S.Spinner />
    </S.Wrap>
  );
};
