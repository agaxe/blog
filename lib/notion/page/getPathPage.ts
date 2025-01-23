import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPathPage = async () => {
  try {
    const data = await getPageItems();
    const items = parseDatabaseItems(data);

    return items.map(({ id: pageId }) => ({
      pageId
    }));
  } catch (error) {
    console.error('Error: getPathPage');
    throw error;
  }
};
