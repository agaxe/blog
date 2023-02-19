import { getDatabaseItems } from '@/lib/notion//pages';
import { notionClient } from '@/lib/notion/config';
import { getPreviewImageMap } from '@/utils/notion/previewImages';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPageItem = async (pageId: string) => {
  const pageItem = await notionClient.getPage(pageId);

  const previewImageMap = await getPreviewImageMap(pageItem);
  (pageItem as any).preview_images = previewImageMap;

  return pageItem;
};

export const getPageParams = async () => {
  const data = await getDatabaseItems();
  const items = parseDatabaseItems(data);

  return items.map(({ id: pageId }) => ({
    params: {
      pageId
    }
  }));
};
