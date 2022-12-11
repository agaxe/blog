import React from 'react';
import Image from 'next/image';
import * as S from './styles';

export const Profile = () => {
  return (
    <S.Profile>
      <Image src='/images/profile.png' alt='profile-img' fill />
    </S.Profile>
  );
};
