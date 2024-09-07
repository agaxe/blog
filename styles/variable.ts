import { css } from 'styled-components';

export const variable = css`
  :root {
    //* color
    --color-black: #333;
    --color-white: #fff;

    //* layout
    --layout-inner-w: 720px;
    --layout-side-pd: 16px;
    --layout-header-h: var(--notion-header-height); // 45px
    --layout-footer-h: 100px;
    --layout-page-header-h: 184px;
    --layout-padding-top: 32px;

    //* size
    --size-header-icon-w: 20px;
  }
`;
