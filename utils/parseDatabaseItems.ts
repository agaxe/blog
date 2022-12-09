import { getDatabaseItems } from '@/lib/notion';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface ParseDatabaseItemsType {
  id: string;
  title: string;
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
  createdAt: string;
}

export const parseDatabaseItems = (
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  return databaseItems.map((item) => {
    if (!('properties' in item)) return item;

    const { name, tags } = item.properties;

    return {
      id: item.id,
      title: name.type === 'title' ? name.title[0].plain_text : '',
      tags: tags.type === 'multi_select' ? tags.multi_select : [],
      createdAt: item.created_time ? item.created_time : ''
    };
  });
};
