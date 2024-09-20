import { getPageItems } from '@/lib/notion/pages/getPageItems';

export type TagWithCnt = Awaited<ReturnType<typeof getTagsWithPostCnt>>;
export type TagWithCntObj = Record<string, number>;

export const getTagsWithPostCnt = async () => {
  try {
    const tagsMap = new Map<string, number>();
    const pages = await getPageItems();

    pages.forEach((page) => {
      //@ts-ignore
      const tags = page.properties.tags.multi_select;

      //@ts-ignore
      tags.forEach(({ name }) => {
        const tagName = name.toLowerCase();
        const tagsMapItem = tagsMap.get(tagName);

        tagsMap.set(tagName, tagsMapItem ? tagsMapItem + 1 : 1);
      });
    });

    return tagsMap;
  } catch (error) {
    console.error('Error: getTagsWithPostCnt');
    throw error;
  }
};
