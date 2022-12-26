import { css } from 'styled-components';
import { device } from '@/styles/device';

export const global = css`
  html,
  body {
    font-size: 16px;
    color: var(--color-default);
    background-color: var(--color-bg);
    transition: background-color 0.3s;
    ${device('md')} {
      font-size: 13px;
    }
  }

  body {
    overflow-x: hidden;
  }
`;
