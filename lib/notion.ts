import { Client } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';
import { convertPascalCase } from '@/utils/convertPascalCase';
import {
  ParseDatabaseItemsType,
  parseDatabaseItems
} from '@/utils/parseDatabaseItems';

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

export const enum propertyTable {
  IsCompleted = 'isCompleted',
  Tags = 'tags',
  CreatedAt = 'createdAt'
}

const databaseItemsParameter = (
  databaseId: string,
  tagName: DatabaseQueryOption['tagName']
): QueryDatabaseParameters => {
  const tag = tagName ? convertPascalCase(tagName) : '';
  return {
    database_id: databaseId,
    filter: {
      and: [
        {
          property: propertyTable.IsCompleted,
          checkbox: {
            equals: true
          }
        },
        {
          property: propertyTable.Tags,
          multi_select: {
            contains: tag
          }
        }
      ]
    },
    sorts: [
      {
        property: propertyTable.CreatedAt,
        direction: 'descending'
      }
    ],
    page_size: 3 //! 10
  };
};

export const notionClient = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER_ID,
  authToken: process.env.NOTION_AUTH_TOKEN
});

export const notionHqClient = new Client({
  auth: process.env.NOTION_API_TOKEN
});

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

export const getPageItem = async (pageId: string) => {
  const pageItem = await notionClient.getPage(pageId);

  return pageItem;
};

export const getDatabaseTagItems = async (databaseId: string) => {
  const database = await getDatabaseItem(databaseId);
  const tagItems = (database.properties[propertyTable.Tags] as any).multi_select
    .options;

  return tagItems;
};

//* getStaticPaths: path
export const getPathPageItems = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const databaseItems = await getDatabaseItems(databaseId);
  return databaseItems.results.map(({ id: pageId }) => ({
    params: {
      pageId
    }
  }));
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

//* search
export async function getSearchResult(query: string) {
  const result = await notionHqClient.search({
    query,
    sort: {
      timestamp: 'last_edited_time',
      direction: 'descending'
    },
    filter: {
      property: 'object',
      value: 'page'
    }
  });

  return query ? result.results : [];
}
