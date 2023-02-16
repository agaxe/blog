import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPageItems } from '@/lib/notion/pages';
import { getPathTagItems } from '@/lib/notion/tags';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const tagParams = await getPathTagItems();
    const pageParams = await getPathPageItems();

    await res.revalidate('/');

    await Promise.all(
      tagParams.map(async (item: any) => {
        await res.revalidate(`/tags/${item.params.tagName}`);
      })
    );

    //* post
    if (req.query.postId) {
      await res.revalidate(`/${req.query.postId}`);
    } else {
      await Promise.all(
        pageParams.map(async (item: any) => {
          await res.revalidate(`/${item.params.pageId}`);
        })
      );
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
