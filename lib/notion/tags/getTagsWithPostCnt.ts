import { getPageItems } from '@/lib/notion/pages/getPageItems';

export type TagsMap = Map<string, number>;
export type TagsObj = Record<string, number>;

export const getTagsWithPostCnt = async (): Promise<TagsMap> => {
  const tagsMap = new Map();
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
};
