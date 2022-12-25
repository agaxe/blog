import type { NextApiRequest, NextApiResponse } from 'next';
import { getSearchResult } from '@/lib/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query;

    const data = await getSearchResult(String(query));

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ data: [], error });
  }
}
