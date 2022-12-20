import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPageItems, getPathTagItems } from '@/lib/notion';

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

    for (const idx in tagParams) {
      await res.revalidate(`/tags/${tagParams[idx].params.tagName}`);
    }
    for (const idx in pageParams) {
      await res.revalidate(`/${pageParams[idx].params.pageId}`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
