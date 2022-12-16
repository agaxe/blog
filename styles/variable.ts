import { css } from 'styled-components';
import { device } from './device';

export const variable = css`
  :root {
    //* color
    --color-black: #333;
    --color-gray: #666;
    --color-white: #fff;
    --color-line-gray: #ededec;

    //* layout
    --layout-inner-w: 720px;
    --layout-side-pd: 16px;
    --layout-page-header-h: 184px;

    ${device('md')} {
      --layout-side-pd: 8px;
    }
  }
`;
