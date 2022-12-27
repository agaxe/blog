import { css } from 'styled-components';
import { device } from './device';

export const variable = css`
  :root {
    //* color
    --color-black: #333;
    --color-white: #fff;

    //* layout
    --layout-inner-w: 720px;
    --layout-side-pd: 16px;
    --layout-page-header-h: 184px;

    //* size
    --size-header-icon-w: 20px;
  }
`;
