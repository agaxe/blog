import type { TagsObj } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';

export interface TagsWithCntFallback {
  [SwrFallbackKeys.TAGS_WITH_CNT]: { tags: TagsObj };
}
