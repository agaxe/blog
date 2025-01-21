import mockParsePageItems from '@/mocks/parsePageItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { getPathPages } from '../getPathPages';

jest.mock('@/utils/parseDatabaseItems');

describe('getPathPages', () => {
  it('최대 아이템 10개, 아이템 수 10개 -> 페이지 수는 1개', async () => {
    (parseDatabaseItems as jest.Mock).mockReturnValue(mockParsePageItems);

    const result = await getPathPages();

    expect(result).toEqual([{ pageNum: '1' }]);
  });

  it('최대 아이템 10개, 아이템 수 23개 -> 페이지 수는 3개', async () => {
    (parseDatabaseItems as jest.Mock).mockReturnValue([
      ...mockParsePageItems,
      ...mockParsePageItems,
      ...mockParsePageItems.filter((_, i) => i < 3)
    ]);

    const result = await getPathPages();

    expect(result).toEqual([
      { pageNum: '1' },
      { pageNum: '2' },
      { pageNum: '3' }
    ]);
  });
});
