import React from 'react';
import { Profile } from '@/components/common/Profile';
import * as S from './styles';

const linkItems = [
  {
    name: 'github',
    url: 'https://github.com/agaxe'
  },
  {
    name: 'email',
    url: 'mailto:agaxe.dev@gmail.com'
  }
];

export const MainHeader = () => {
  return (
    <S.MainHeader>
      <Profile />
      <S.IntroduceWrap>
        <S.Title>Agaxe</S.Title>
        <S.Description>
          React 를 중심으로 개발하는 프론트엔드 개발자입니다.
        </S.Description>
        <S.LinkList>
          {linkItems.map(({ name, url }) => (
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
