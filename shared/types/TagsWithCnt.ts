import type { SelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export type TagsWithCnt = (SelectPropertyItemObjectResponse['select'] & {
  cnt: number;
})[];
