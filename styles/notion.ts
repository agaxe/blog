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
      list-style: inherit;
    }

    li {
      span {
        word-break: break-word;
      }
    }

    .notion-page {
      padding-left: 0;
      padding-right: 0;
    }

    .notion-page-no-cover {
      margin-top: 0 !important;
    }

    .notion-collection-row {
      padding: 0;
    }

    .notion-collection-row-body {
      display: grid;
      gap: 16px !important;
      margin-bottom: 40px;
    }

    .notion-collection-row-value {
      padding: 0;
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

    .notion-table-of-contents.notion-gray {
      display: none;
      & + .notion-hr {
        display: none;
      }
    }
    .notion-title {
      text-align: center;
      margin-bottom: 16px;
      margin-top: 40px;
      ${device('md')} {
        font-size: 2rem;
      }
    }

    .notion-collection-row-body {
      gap: 4px;
    }

    .notion-frame {
      padding: 0;
    }

    .notion-bookmark {
      border: 1px solid var(--color-line-bookmark);
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

    code[class*='language-'] {
      display: block;
      overflow: auto;
      padding-bottom: calc(1rem / 2);
      tab-size: 2;
    }
    pre[class*='language-'] {
      overflow: hidden;
    }

    .notion-hr {
      border-color: var(--color-line-gray);
    }
    .notion-asset-caption {
      color: var(--color-caption);
    }

    .notion-list {
      width: 100%;
    }

    // 리스트 마크다운 형식 사용 시, 하위 컨텐츠에 따른 padding-left 제거
    .notion-list {
      &:has(> .notion-row, > figure, > .notion-code) {
        padding-inline-start: 0;
      }
    }

    .notion-aside-table-of-contents-header {
      display: none;
    }
    .notion-table-of-contents-active-item {
      color: var(--color-primary) !important;
    }

    .notion-simple-table td {
      border: 1px solid var(--color-line-bookmark);
    }

    // 외부 링크 이미지 사이즈 기본값 적용
    .notion-asset-wrapper-image > div {
      //width: initial !important;
      align-self: center !important;
    }

    // 콜아웃
    .notion-callout {
      background-color: var(--color-bg-callout);
    }

    // 인용구
    .notion-quote {
      font-size: 1em;
    }
  } // notion app
`;
