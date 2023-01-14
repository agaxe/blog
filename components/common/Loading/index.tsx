import React from 'react';
import * as S from './styles';

export interface LoadingProps {
  isShow: boolean;
}

export const Loading = ({ isShow }: LoadingProps) => {
  return (
    <S.Wrap isShow={isShow}>
      <S.Spinner />
    </S.Wrap>
  );
};
