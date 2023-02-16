import { pageSize } from '@/shared/variable';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPaginationPosts = (
  items: ReturnType<typeof parseDatabaseItems>,
  pageNum: number
) => {
  const pages = [...Array(pageSize)].map(
    (v, i) => i + (pageNum - 1) * pageSize
  );

  return items.slice(pages[0], pages[pages.length - 1] + 1);
};
