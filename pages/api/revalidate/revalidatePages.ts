import type { NextApiResponse } from 'next';
import { getPathPages } from '@/lib/notion/pages/getPathPages';

export const revalidatePages = async (res: NextApiResponse) => {
  try {
    const pagesPaths = await getPathPages();

    return pagesPaths.map(({ params: { pageNum } }) => {
      const path = `/pages/${pageNum}`;

      res.revalidate(path);
      return path;
    });
  } catch (error) {
    console.error('Error: revalidatePages');
    throw error;
  }
};
