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

export const getPathTagPages = async () => {
  const tagItems = await getTagItems();

  const params = await Promise.all([
    ...tagItems.map(async (v: any) => {
      const tagName = String(v.name).toLowerCase();
      const data = await getPageItems({
        tagName
      });
      const items = parseDatabaseItems(data);
      const pageLength = getPaginationLength(items);

      return [...Array(pageLength)].map((_, idx) => ({
        params: { tagName, pageNum: String(idx + 1) }
      }));
    })
  ]);

  return ([] as PathTagPages).concat(...params);
};
