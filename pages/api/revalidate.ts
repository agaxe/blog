import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPage } from '@/lib/notion/page';
import { getPathTagPages } from '@/lib/notion/tags';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const tagParams = await getPathTagPages();
    const pageParams = await getPathPage();

    await res.revalidate('/');

    await Promise.all(
      tagParams.map(async ({ params: { tagName, pageNum } }: any) => {
        await res.revalidate(`/tags/${tagName}/pages/${pageNum}`);
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
