import { css } from 'styled-components';
import { device } from './device';

export const notion = css`
  .notion,
  .notion-app {
    background-color: inherit;
    color: inherit;
  }

  .notion-app {
    ul,
    li {
      list-style: initial;
    }

    li {
      span {
        word-break: break-word;
      }
    }
  }

  .notion-page {
    padding-left: var(--layout-side-pd);
    padding-right: var(--layout-side-pd);
  }
  .notion-collection-page-properties {
    .notion-collection-column-title {
      display: none;
    }
  }

  .notion-collection-row-property {
    .notion-property {
      display: flex;
      justify-content: center;
    }
  }

  .notion-page {
    .notion-table-of-contents.notion-gray {
      display: none;
      & + .notion-hr {
        display: none;
      }
    }
    .notion-title {
      text-align: center;
      ${device('md')} {
        font-size: 2rem;
      }
    }
  }
  .notion-collection-row-body {
    gap: 4px;
  }

  .notion-frame {
    padding: 0;
  }

  .notion-bookmark {
    border: 1px solid ${({ theme }) => theme.border.bookmark};
    & > div:first-child {
      color: inherit;
    }
    &-link-text {
      color: inherit;
    }
  }

  .notion-aside-table-of-contents {
    background-color: inherit;
  }

  .notion-table-of-contents-item {
    color: inherit;
  }
`;
