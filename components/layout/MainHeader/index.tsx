import React from 'react';
import { Profile } from '@/components/common/Profile';
import * as S from './styles';
import config from '@/config';
import { convertPascalCase } from '@/utils/convertPascalCase';

export const MainHeader = () => {
  return (
    <S.MainHeader>
      <Profile />
      <S.IntroduceWrap>
        <S.Title>{convertPascalCase(config.name)}</S.Title>
        <S.Description>{config.description}</S.Description>
        <S.LinkList>
          {config.social.map(({ name, url }) => (
            <S.LinkItem key={name}>
              <a href={url} target='_blank' rel='noreferrer'>
                {name}
              </a>
            </S.LinkItem>
          ))}
        </S.LinkList>
      </S.IntroduceWrap>
    </S.MainHeader>
  );
};
