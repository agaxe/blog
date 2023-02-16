import fs from 'fs';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const getPostsWithJson = () => {
  const items = JSON.parse(
    fs.readFileSync('./public/posts.json', 'utf-8')
  ) as ReturnType<typeof parseDatabaseItems>;

  return items;
};
