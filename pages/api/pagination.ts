import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabasePaginationItems } from '@/lib/notion/pages';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { start_cursor, has_more, tagName } = req.query;

    const databaseId = process.env.NOTION_DB_ID as string;

    const data = await getDatabasePaginationItems(databaseId, {
      startCursor: start_cursor as string,
      hasMore: Boolean(Number(has_more)),
      tagName: String(tagName)
    });

    const { results, nextCursor, hasMore } = data;

    return res.json({
      data: {
        results: parseDatabaseItems(results),
        nextCursor,
        hasMore
      }
    });
  } catch (error) {
    return res.status(500).json({ data: null, error });
  }
}
