import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PathTagPages,
  getPathTagPages
} from '@/lib/notion/tags/getPathTagPages';

export const revalidateTagPages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const queryTagName = (req.query?.tagName as string) || '';

  const revalidate = (arr: PathTagPages = []) => {
    return arr.map(({ params: { tagName, pageNum } }) => {
      const path = `/tags/${tagName}/pages/${pageNum}`;

      res.revalidate(path);
      return path;
    });
  };

  const tagPaths = await getPathTagPages(queryTagName);
  return revalidate(tagPaths);
};
