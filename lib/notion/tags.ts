import {
  getDatabaseInfo,
  getDatabaseItems,
  propertyTable
} from '@/lib/notion/pages';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getDatabaseTagItems = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const database = await getDatabaseInfo(databaseId);
  const tagItems = (database.properties[propertyTable.Tags] as any).multi_select
    .options;

  return tagItems;
};

export const getPathTagItems = async () => {
  const tagItems = await getDatabaseTagItems();

  const params = await Promise.all(
    tagItems.map(async (v: any) => {
      const tagName = String(v.name).toLowerCase();
      const data = await getDatabaseItems({
        tagName
      });
      const items = parseDatabaseItems(data);
      const pageLength = getPaginationLength(items);

      return [...Array(pageLength)].map((_, idx) => ({
        params: { tagName, pageNum: String(idx + 1) }
      }));
    })
  );

  return [...[].concat(...params)];
};
