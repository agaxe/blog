import React from 'react';
import * as S from './styles';

interface IconProps {
  className?: string;
  name: string;
}

export const Icon = ({ className = '', name }: IconProps) => {
  return (
    <S.Icon
      className={className}
      name={name}
      src={`/icons/icon_${name}.svg`}
      uniquifyIDs={true}
    />
  );
};
