import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPageItems } from '@/lib/notion/pages';
//import { getPathTagItems } from '@/lib/notion/tags';
import { setPostsWithJson } from '@/utils/setPostsWithJson';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    //* post
    if (req.query.postId) {
      await res.revalidate(`/${req.query.postId}`);
    } else {
      const data = await setPostsWithJson();

      await Promise.all(
        data.map(async (item: any) => {
          await res.revalidate(`/${item.params.pageId}`);
        })
      );
    }

    //* main
    // await res.revalidate('/');

    //* tag
    //const tagParams = await getPathTagItems();

    // await Promise.all(
    //   tagParams.map(async (item: any) => {
    //     await res.revalidate(`/tags/${item.params.tagName}`);
    //   })
    // );

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
