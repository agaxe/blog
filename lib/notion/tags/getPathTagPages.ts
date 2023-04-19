import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getTagItems } from '@/lib/notion/tags/getTagItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export type PathTagPages = {
  params: {
    tagName: string;
    pageNum: string;
  };
}[];

const gatParamsTagPages = async (tag: string) => {
  const tagName = String(tag).toLowerCase();
  const data = await getPageItems({
    tagName
  });
  const items = parseDatabaseItems(data);
  const pageLength = getPaginationLength(items);

  return [...Array(pageLength)].map((_, idx) => ({
    params: { tagName, pageNum: String(idx + 1) }
  }));
};

export const getPathTagPages = async (tagName = '') => {
  const tagItems = await getTagItems();

  // all
  if (!tagName) {
    const params = await Promise.all([
      ...tagItems.map(async (v: any) => {
        return gatParamsTagPages(v.name);
      })
    ]);

    return ([] as PathTagPages).concat(...params);
  }

  // specific
  const findTag =
    tagItems.find((tag) => tag.name.toLowerCase() === tagName.toLowerCase())
      ?.name || '';

  if (!findTag) {
    throw new Error('tag not found');
  }

  return gatParamsTagPages(findTag);
};
