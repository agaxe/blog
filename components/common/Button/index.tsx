import React, { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children } = props;
  return <S.Btn {...props}>{children}</S.Btn>;
};
