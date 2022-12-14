import React from 'react';
import { Image } from '@/components/common/Image';
import * as S from './styles';

export const Profile = () => {
  return (
    <S.Profile>
      <Image src='/images/profile.png' alt='profile-img' fill />
    </S.Profile>
  );
};
