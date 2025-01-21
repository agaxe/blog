import { TagWithCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { NavPageOptions } from '@/shared/types/NavPageOptions';
import type { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';

export interface PostListContentProps {
  data: ParseDatabaseItemsType[];
  tags: TagWithCnt;
  pageOptions?: NavPageOptions;
}
