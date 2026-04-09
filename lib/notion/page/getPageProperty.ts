import { getPageProperty as getPostProperty, parsePageId } from 'notion-utils';
import { getPageItem } from '@/lib/notion/page/getPageItem';

export const getPageProperty = async (pageUuid: string, type: string) => {
  try {
    const recordMap = await getPageItem(pageUuid);
    const pageId = parsePageId(pageUuid);
    if (!pageId) throw new Error(`Invalid page ID: ${pageUuid}`);
    const blockData = recordMap.block[pageId].value;
    const block = 'value' in blockData ? blockData.value : blockData;

    return getPostProperty(type, block, recordMap);
  } catch (error) {
    console.error('Error: getPageProperty');
    throw error;
  }
};
