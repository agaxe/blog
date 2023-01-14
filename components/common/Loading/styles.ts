import styled, { css } from 'styled-components';
import { loadingSpinnerStyle } from '@/styles/mixin';
import { LoadingProps } from './';

export const Wrap = styled.div<LoadingProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0.3s;
  ${({ isShow }) =>
    !isShow &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

export const Spinner = styled.div`
  ${loadingSpinnerStyle({
    size: '70px',
    borderWidth: 5,
    color: 'var(--color-gray)',
    bgColor: 'var(--color-line-gray)'
  })}
`;
