import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPathPages = async () => {
  try {
    const data = await getPageItems();
    const items = parseDatabaseItems(data);
    const pageLength = getPaginationLength(items);

    return [...Array(pageLength)].map((v, i) => ({ pageNum: String(i + 1) }));
  } catch (error) {
    console.error('Error: getPathPages');
    throw error;
  }
};
