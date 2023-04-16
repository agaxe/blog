import { notionHqClient } from '@/lib/notion/config';

/**
 * - 데이터 베이스 정보
 */
export const getDatabaseInfo = async (databaseId: string) => {
  const response = await notionHqClient.databases.retrieve({
    database_id: databaseId
  });
  return response;
};
