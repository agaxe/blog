import { notionClient } from '@/lib/notion/config';

export const getPageItem = async (pageId: string) => {
  const pageItem = await notionClient.getPage(pageId);

  return pageItem;
};
