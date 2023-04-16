import type { NextApiResponse } from 'next';
import {
  PathTagPages,
  getPathTagPages
} from '@/lib/notion/tags/getPathTagPages';

export const revalidateTagPages = async (res: NextApiResponse) => {
  const revalidate = (arr: PathTagPages = []) => {
    return arr.map(({ params: { tagName, pageNum } }) => {
      const path = `/tags/${tagName}/pages/${pageNum}`;

      res.revalidate(path);
      return path;
    });
  };

  const tagPaths = await getPathTagPages();
  return revalidate(tagPaths);
};
