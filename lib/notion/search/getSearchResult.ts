import { notionHqClient } from '@/lib/notion/config';

export async function getSearchResult(query: string) {
  const result = await notionHqClient.search({
    query,
    sort: {
      timestamp: 'last_edited_time',
      direction: 'descending'
    },
    filter: {
      property: 'object',
      value: 'page'
    }
  });

  return query ? result.results : [];
}
