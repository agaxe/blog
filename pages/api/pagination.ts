import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseItems } from '@/lib/notion';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { start_cursor, has_more } = req.query;

    const databaseId = process.env.NOTION_DB_ID as string;

    const data = await getDatabaseItems(databaseId, {
      pagination: {
        startCursor: start_cursor as string,
        hasMore: Boolean(has_more)
      }
    });

    const { results, startCursor, hasMore } = data;

    return res.json({
      data: {
        results: parseDatabaseItems(results),
        startCursor,
        hasMore
      }
    });
  } catch (error) {
    return res.status(500).json({ data: null, error });
  }
}
