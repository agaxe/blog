import { getPageProperty as getPostProperty, parsePageId } from 'notion-utils';
import { getPageItem } from '@/lib/notion/page/getPageItem';

export const getPageProperty = async (pageUuid: string, type: string) => {
  try {
    const recordMap = await getPageItem(pageUuid);
    const block = recordMap.block[parsePageId(pageUuid)].value;

    return getPostProperty(type, block, recordMap);
  } catch (error) {
    console.error('Error: getPageProperty');
    throw error;
  }
};
