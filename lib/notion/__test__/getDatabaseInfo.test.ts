import mockNotionDB from '@/mocks/notionDB';
import { getDatabaseInfo } from '../getDatabaseInfo';

describe('getDatabaseInfo', () => {
  it('반환값 확인', async () => {
    const res = await getDatabaseInfo('NOTION_DATABASE_ID');

    expect(res.id).toEqual(mockNotionDB.id);
  });
});
