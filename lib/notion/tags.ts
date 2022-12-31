import { getDatabaseItem, propertyTable } from '@/lib/notion/pages';

export const getDatabaseTagItems = async (databaseId: string) => {
  const database = await getDatabaseItem(databaseId);
  const tagItems = (database.properties[propertyTable.Tags] as any).multi_select
    .options;

  return tagItems;
};

export const getPathTagItems = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const tagItems = await getDatabaseTagItems(databaseId);
  return tagItems.map(({ name: tagName }: any) => ({
    params: {
      tagName: tagName.toLowerCase()
    }
  }));
};
