import { css } from 'styled-components';
import { device } from '@/styles/device';

export const reset = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
    color: ${({ theme }) => theme.color.default};
    background-color: ${({ theme }) => theme.bgColor.default};
    ${device('md')} {
      font-size: 13px;
    }
  }

  body {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  li {
    list-style: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
