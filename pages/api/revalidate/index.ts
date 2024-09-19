import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePages } from './revalidatePages';
import { revalidatePosts } from './revalidatePosts';
import { revalidateTagPages } from './revalidateTagPages';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.query.secret !== process.env.BLOG_ODR_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const result = await Promise.all([
      res.revalidate('/').then(() => '/'),
      revalidatePosts(req, res),
      revalidatePages(res),
      revalidateTagPages(req, res)
    ]);

    return res.json({ revalidated: true, result });
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    return res.status(500).send({ error: error.message });
  }
}
