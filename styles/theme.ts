import { css } from 'styled-components';

export const Theme = css`
  :root {
    --color-primary: #f59f00;
    --color-bg-light: var(--color-white);
    --color-bg-dark: #2f3437;

    &[data-theme='light'] {
      --color-default: var(--color-black);
      --color-default-reverse: var(--color-white);
      --color-bg: var(--color-bg-light);
      --color-bg-reverse: var(--color-bg-dark);
      --color-gray: #666;
      --color-gray-hover: #868e96;
      --color-caption: #999;
      --color-line-gray: #ededec;
      --color-line-bookmark: #dfdfde;
      --color-bg-header: hsla(0, 0%, 100%, 0.8);
      --color-bg-callout: var(--notion-gray_background_co);
    }
    &[data-theme='dark'] {
      --color-default: var(--color-white);
      --color-default-reverse: var(--color-black);
      --color-bg: var(--color-bg-dark);
      --color-bg-reverse: var(--color-bg-light);
      --color-gray: #ededec;
      --color-gray-hover: #adb5bd;
      --color-caption: #808080;
      --color-line-gray: #666;
      --color-line-bookmark: #555;
      --color-bg-header: hsla(0, 0%, 100%, 0);
      --color-bg-callout: #303030;
    }
  }
`;
