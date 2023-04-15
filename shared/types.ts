import type { SelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface NavPageOptionsType {
  pageNum: number;
  pageLength: number;
  pagePath?: string;
}

export interface NavPageOptionsFallbackType {
  'page-options': NavPageOptionsType;
}

export type TagsWithCnt = (SelectPropertyItemObjectResponse['select'] & {
  cnt: number;
})[];
