import { pageSize } from '@/shared/variable';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPaginationLength = (
  items: ReturnType<typeof parseDatabaseItems>
) => {
  return Math.ceil(items.length / pageSize);
};
