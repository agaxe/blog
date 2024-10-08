import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPage } from '@/lib/notion/page/getPathPage';

export const revalidatePosts = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!req.query.postId) {
      const pagePaths = await getPathPage();

      return pagePaths.map((item: any) => {
        const path = `/${item.params.pageId}`;
        res.revalidate(path);

        return path;
      });
    }

    const path = `/${req.query.postId}`;
    res.revalidate(path);

    return path;
  } catch (error) {
    console.error('Error: revalidatePosts');
    throw error;
  }
};
