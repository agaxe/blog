import { getPageProperty, parsePageId } from 'notion-utils';
import { getPageItem } from '@/lib/notion/page';

export const getPostProperty = async (pageUuid: string, type: string) => {
  const recordMap = await getPageItem(pageUuid);
  const block = recordMap.block[parsePageId(pageUuid)].value;

  return getPageProperty(type, block, recordMap);
};
