import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { notionHqClient } from '@/lib/notion/config';
import { isDev } from '@/shared/variable';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

const enum propertyStatus {
  Wait = 'wait',
  Progress = 'progress',
  Complete = 'complete'
}

export const enum propertyTable {
  IsCompleted = 'isCompleted',
  Status = 'status',
  Tags = 'tags',
  CreatedAt = 'createdAt'
}

/**
 * - 데이터 베이스 정보
 */
export const getDatabaseInfo = async (databaseId: string) => {
  const response = await notionHqClient.databases.retrieve({
    database_id: databaseId
  });
  return response;
};

/**
 * - 데이터 베이스의 페이지(포스트) 리스트 정보
 */
export const getDatabaseItems = async (options?: {
  tagName?: string;
  pageSize?: number;
}) => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const tagName = options?.tagName ? convertPascalCase(options?.tagName) : '';
  const pageSizeNum = options?.pageSize;

  //* options
  const filterAnd = [
    {
      property: propertyTable.Tags,
      multi_select: {
        contains: tagName
      }
    }
  ];

  if (!isDev) {
    filterAnd.push({
      property: propertyTable.Status,
      status: {
        equals: propertyStatus.Complete
      }
    } as any);
  }

  const request: QueryDatabaseParameters = {
    database_id: databaseId,
    filter: {
      and: filterAnd
    },
    sorts: [
      {
        property: propertyTable.CreatedAt,
        direction: 'descending'
      }
    ],
    page_size: pageSizeNum
  };

  const response = await notionHqClient.databases.query(request);

  return response.results;
};

export const getPathPages = async () => {
  const data = await getDatabaseItems();
  const items = parseDatabaseItems(data);
  const pageLength = getPaginationLength(items);

  return [...Array(pageLength)].map((v, i) => ({
    params: { pageNum: String(i + 1) }
  }));
};
