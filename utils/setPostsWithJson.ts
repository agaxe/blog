import fs from 'fs';
import { getDatabaseItems } from '@/lib/notion/pages';
import { parseDatabaseItems } from './parseDatabaseItems';

export const setPostsWithJson = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const dbItems = await getDatabaseItems(databaseId);
  const { nextCursor, hasMore, results } = dbItems;

  const data = parseDatabaseItems(results);

  try {
    fs.writeFileSync('./public/posts.json', JSON.stringify(data));
  } catch (err) {
    console.log('err', err);
  }

  return data;
};
