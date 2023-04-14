import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePages } from './revalidatePages';
import { revalidatePosts } from './revalidatePosts';
import { revalidateTagPages } from './revalidateTagPages';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/');

    const result = await Promise.all([
      revalidateTagPages(res),
      revalidatePages(res),
      revalidatePosts(req, res)
    ]);

    return res.json({ revalidated: true, result });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
