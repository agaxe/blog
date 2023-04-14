import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPage } from '@/lib/notion/page';
import { getPathPages } from '@/lib/notion/pages';
import { getPathTagPages } from '@/lib/notion/tags';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const revalidateTagPages = async () => {
    const tagPaths = await getPathTagPages();

    return tagPaths.map(({ params: { tagName, pageNum } }) => {
      const path = `/tags/${tagName}/pages/${pageNum}`;

      res.revalidate(path);
      return path;
    });
  };

  const revalidatePosts = async () => {
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

    return [path];
  };

  const revalidatePages = async () => {
    const pagesPaths = await getPathPages();

    return pagesPaths.map(({ params: { pageNum } }) => {
      const path = `/pages/${pageNum}`;

      res.revalidate(path);
      return path;
    });
  };

  try {
    await res.revalidate('/');
    const result = await Promise.all([
      revalidateTagPages(),
      revalidatePages(),
      revalidatePosts()
    ]);

    return res.json({ revalidated: true, result });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
