import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';

export interface DatabaseQueryOption {
  tagName?: string;
}

export const propertyTable = {
  isCompleted: 'isCompleted',
  tags: 'tags',
  createdAt: 'createdAt'
};

export const notionClient = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER_ID,
  authToken: process.env.NOTION_AUTH_TOKEN
});

export const notionHqClient = new Client({
  auth: process.env.NOTION_API_TOKEN
});

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const response = await notionHqClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: propertyTable.isCompleted,
          checkbox: {
            equals: true
          }
        },
        {
          property: propertyTable.tags,
          multi_select: {
            contains: option?.tagName ?? ''
          }
        }
      ]
    },
    sorts: [
      {
        property: propertyTable.createdAt,
        direction: 'descending'
      }
    ]
  });
  return response.results;
};
