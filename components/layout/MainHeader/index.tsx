import React from 'react';
import config from '@/config';
import { Profile } from '@/components/common/Profile';
import { convertPascalCase } from '@/utils/convertPascalCase';
import * as S from './styles';

export const MainHeader = () => {
  return (
    <S.MainHeader>
      <Profile />
      <S.IntroduceWrap>
        <S.Title>{convertPascalCase(config.name)}</S.Title>
        <S.Description>{config.site.description}</S.Description>
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
