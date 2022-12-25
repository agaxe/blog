import { css } from 'styled-components';
import { device } from './device';

export const variable = css`
  :root {
    //* color
    --color-black: #333;
    --color-white: #fff;

    //* light mode
    --color-theme-light-bg: #fff;
    --color-theme-light-gray: #666;
    --color-theme-light-line-gray: #ededec;
    --color-theme-light-line-bookmark: #dfdfde;
    --color-theme-light-bg-header: hsla(0, 0%, 100%, 0.8);

    //* dark mode
    --color-theme-dark-bg: #2f3437;
    --color-theme-dark-gray: #ededec;
    --color-theme-dark-line-gray: #666;
    --color-theme-dark-line-bookmark: #555;
    --color-theme-dark-bg-header: hsla(0, 0%, 100%, 0);

    //* layout
    --layout-inner-w: 720px;
    --layout-side-pd: 16px;
    --layout-page-header-h: 184px;

    //* size
    --size-header-icon-w: 20px;

    ${device('md')} {
      --layout-side-pd: 8px;
    }
  }
`;
