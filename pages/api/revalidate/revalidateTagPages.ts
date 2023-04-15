import type { NextApiResponse } from 'next';
import { getPathTagPages } from '@/lib/notion/tags';
import type { PathTagPages } from '@/lib/notion/tags';

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
