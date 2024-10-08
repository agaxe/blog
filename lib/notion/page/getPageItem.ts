import { notionClient } from '@/lib/notion/config';
import { getPreviewImageMap } from '@/lib/notion/utils/previewImages';

export const getPageItem = async (pageId: string) => {
  try {
    const pageItem = await notionClient.getPage(pageId);

    const previewImageMap = await getPreviewImageMap(pageItem);
    (pageItem as any).preview_images = previewImageMap;

    return pageItem;
  } catch (error) {
    console.error('Error: getPageItem');
    throw error;
  }
};
