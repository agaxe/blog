import { getDatabaseInfo } from '@/lib/notion/getDatabaseInfo';
import mockNotionDB from '@/mocks/notionDB';
import { getTagItems } from '../getTagItems';

jest.mock('../../getDatabaseInfo');

(getDatabaseInfo as jest.Mock).mockResolvedValue(mockNotionDB);

describe('getTagItems', () => {
  it('아이템 갯수 체크', async () => {
    const tagItems = await getTagItems();

    expect(tagItems.length).toBe(20);
  });

  it('속성 값 확인', async () => {
    const tagItems = await getTagItems();

    expect(tagItems[0].id).toBe('60b24cda-f768-4783-974c-3f6f6663b6ba1');
    expect(tagItems[0].name).toBe('Tag Name_1-1');
    expect(tagItems[0].color).toBe('default');
  });
});
