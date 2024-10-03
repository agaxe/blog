import React from 'react';
import config from '@/config';
import { Profile } from '@/components/common/Profile';
import { convertPascalCase } from '@/utils/convertPascalCase';
import * as S from './styles';

export const MainTitleSection = () => {
  return (
    <S.IntroduceSection data-testid='introduce-section'>
      <Profile />
      <S.IntroduceWrap>
        <S.Title>{convertPascalCase(config.name)}</S.Title>
        <S.Description>{config.site.description}</S.Description>
        <S.LinkList>
          {config.social.map(({ name, url }) => (
            <S.LinkItem key={name} data-testid={`${name}-link-item`}>
              <S.SnsLink href={url} target='_blank' rel='noreferrer'>
                <S.SnsIcon name={name} />
              </S.SnsLink>
            </S.LinkItem>
          ))}
        </S.LinkList>
      </S.IntroduceWrap>
    </S.IntroduceSection>
  );
};
