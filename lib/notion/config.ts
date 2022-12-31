import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

export const notionClient = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER_ID,
  authToken: process.env.NOTION_AUTH_TOKEN
});

export const notionHqClient = new Client({
  auth: process.env.NOTION_API_TOKEN
});
