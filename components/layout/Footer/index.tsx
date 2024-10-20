import React from 'react';
import config from '@/config';
import { convertPascalCase } from '@/utils/convertPascalCase';
import * as S from './styles';

export const Footer = () => {
  return (
    <S.Footer>
      <p>
        {`© ${new Date().getFullYear()}. ${convertPascalCase(
          config.name
        )}. All rights reserved.`}
      </p>
    </S.Footer>
  );
};
