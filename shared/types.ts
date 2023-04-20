import type { SelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { TagsObj } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/SwrFallbackKeys';

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

export interface TagsWithCntFallback {
  [SwrFallbackKeys.TAGS_WITH_CNT]: { tags: TagsObj };
}
