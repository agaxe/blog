import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getDatabaseItems } from '@/lib/notion/pages';
import { isDev } from '@/shared/variable';
import { normalizeTitleKo } from '@/utils/normalizeTitleKo';
import { convertUuidToPostId } from './convertUuidToPostId';

export interface ParseDatabaseItemsType {
  id: string;
  title: string;
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
  createdAt: string;
  isCompleted: boolean;
}

export const parseDatabaseItems = (
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  return databaseItems
    .filter((it: any) =>
      !isDev ? it.properties['status'].status.name === 'complete' : it
    )
    .map((item) => {
      if (!('properties' in item)) return item;

      const { name, tags, status } = item.properties;
      const title = name.type === 'title' ? name.title[0].plain_text : '';
      const id = convertUuidToPostId(item.id);
      const koId = normalizeTitleKo(title) + '-' + id;

      return {
        koId,
        id,
        title,
        tags: tags.type === 'multi_select' ? tags.multi_select : [],
        createdAt: item.created_time ? item.created_time : '',
        isCompleted:
          status.type === 'status' && status?.status?.name === 'complete'
      };
    });
};
