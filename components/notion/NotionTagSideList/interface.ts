import type { TagsObj } from '@/lib/notion/tags/getTagsWithPostCnt';

export interface NotionTagSideListProps {
  data: TagsObj;
  isFixed: boolean;
}
