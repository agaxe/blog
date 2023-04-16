import type { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getDatabaseInfo } from '../getDatabaseInfo';
import { propertyTable } from '../pages/getPageItems';

export const getTagItems = async (): Promise<
  MultiSelectPropertyItemObjectResponse['multi_select']
> => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const database = await getDatabaseInfo(databaseId);
  const tagItems = (database.properties[propertyTable.Tags] as any).multi_select
    .options;

  return tagItems;
};
