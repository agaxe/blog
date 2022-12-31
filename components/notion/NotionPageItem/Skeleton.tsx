import React from 'react';
import styled, { css } from 'styled-components';
import * as S from './styles';

export const NotionPageItemSkeleton = () => {
  return (
    <SkelWrap>
      <SkelTitle>.</SkelTitle>
      <SkelDate>.</SkelDate>
      <SkelTagList>
        <SkelTag>.</SkelTag>
        <SkelTag>.</SkelTag>
        <SkelTag>.</SkelTag>
      </SkelTagList>
    </SkelWrap>
  );
};

const commonStyle = css`
  border-radius: 4px;
  text-indent: -9999px;
  animation-name: skeleton-wave;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: linear;

  @keyframes skeleton-wave {
    from {
      background: var(--color-line-gray);
    }
    to {
      background: var(--color-line-bookmark);
    }
  }
`;

const SkelWrap = styled(S.Wrap)`
  user-select: none;
`;

const SkelTitle = styled.div`
  margin-bottom: 24px;
  font-size: 1.8rem;
  width: 80%;
  ${commonStyle}
`;

const SkelDate = styled.div`
  margin-bottom: 16px;
  width: 30%;
  ${commonStyle}
`;

const SkelTagList = styled.div`
  display: flex;
  gap: 6px;
`;

const SkelTag = styled.div`
  font-size: 14px;
  width: 30px;
  ${commonStyle}
`;
