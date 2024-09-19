import { notionHqClient } from '@/lib/notion/config';

export const getSearchResult = async (query: string) => {
  try {
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
  } catch (error) {
    console.error('Error: getSearchResult');
    throw error;
  }
};
