import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';
import { convertPascalCase } from '@/utils/convertPascalCase';

export interface DatabaseQueryOption {
  tagName?: string;
}

export const enum propertyTable {
  IsCompleted = 'isCompleted',
  Tags = 'tags',
  CreatedAt = 'createdAt'
}

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

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const tagName = option?.tagName ? convertPascalCase(option?.tagName) : '';
  const response = await notionHqClient.databases.query({
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
            contains: tagName
          }
        }
      ]
    },
    sorts: [
      {
        property: propertyTable.CreatedAt,
        direction: 'descending'
      }
    ]
  });

  return response.results;
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
