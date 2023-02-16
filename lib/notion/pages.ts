import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { notionHqClient } from '@/lib/notion/config';
import { isDev } from '@/shared/variable';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getPostsWithJson } from '@/utils/getPostsWithJson';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export interface DatabaseQueryOption {
  tagName?: string;
  startCursor?: string;
  hasMore?: boolean;
}

export interface PageItemsReturnType {
  results: ParseDatabaseItemsType[];
  nextCursor: DatabaseQueryOption['startCursor'];
  hasMore: DatabaseQueryOption['hasMore'];
}

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

const databaseItemsParameter = (
  databaseId: string,
  tagName: DatabaseQueryOption['tagName']
): QueryDatabaseParameters => {
  const tag = tagName ? convertPascalCase(tagName) : '';

  const optionFilter = isDev
    ? {
        filter: {
          and: [
            {
              property: propertyTable.Tags,
              multi_select: {
                contains: tag
              }
            }
          ]
        }
      }
    : {
        filter: {
          and: [
            {
              property: propertyTable.Tags,
              multi_select: {
                contains: tag
              }
            },
            {
              property: propertyTable.Status,
              status: {
                equals: propertyStatus.Complete
              }
            }
          ]
        }
      };

  return {
    database_id: databaseId,
    ...optionFilter,
    sorts: [
      {
        property: propertyTable.CreatedAt,
        direction: 'descending'
      }
    ]
    //page_size: 10
  };
};

export const getDatabaseItem = async (databaseId: string) => {
  const response = await notionHqClient.databases.retrieve({
    database_id: databaseId
  });
  return response;
};

export const getDatabasePaginationItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const tagName = option?.tagName ? convertPascalCase(option?.tagName) : '';
  const request = databaseItemsParameter(databaseId, tagName);

  if (!option?.hasMore) {
    return {
      results: [],
      nextCursor: '',
      hasMore: false
    };
  }

  const responseWithPagination = await notionHqClient.databases.query({
    ...request,
    start_cursor: option?.startCursor
  });

  const {
    results,
    next_cursor: nextCursor,
    has_more: hasMore
  } = responseWithPagination;

  return {
    results,
    nextCursor,
    hasMore
  };
};

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const tagName = option?.tagName ? convertPascalCase(option?.tagName) : '';
  const request = databaseItemsParameter(databaseId, tagName);

  const response = await notionHqClient.databases.query(request);

  const { results, next_cursor: nextCursor, has_more: hasMore } = response;

  return {
    results,
    nextCursor,
    hasMore
  };
};

export const getPathPageItems = async (
  items: ReturnType<typeof parseDatabaseItems>
) => {
  return items.map(({ id: pageId }) => ({
    params: {
      pageId
    }
  }));
};
