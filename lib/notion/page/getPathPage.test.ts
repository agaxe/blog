import mockItems from '@/mocks/parsePageItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { getPageItems } from '../pages/getPageItems';
import { getPathPage } from './getPathPage';

jest.mock('@/utils/parseDatabaseItems');
jest.mock('@/lib/notion/pages/getPageItems');

describe('getPathPage', () => {
  it('포스팅 페이지 동적 경로 반환', async () => {
    (getPageItems as jest.Mock).mockResolvedValue({});
    (parseDatabaseItems as jest.Mock).mockReturnValue(mockItems);

    const path = await getPathPage();

    expect(path).toEqual([
      { params: { pageId: 'c9d287d36ecc476a9c4ec9d8b98c9a6e' } },
      { params: { pageId: '192ed4071faa47ccbe65878e28af5e3a' } },
      { params: { pageId: 'ed748e767c254bc0a9a87255245d555c' } },
      { params: { pageId: '3f59cda4a5dd449287d591a987cde7d5' } },
      { params: { pageId: '804ded530147482398f970d24d64c3f0' } },
      { params: { pageId: 'd1caf24911e942ffaab8f14a422f9945' } },
      { params: { pageId: '6eccf1cfb425446a8cccd5f01222978f' } },
      { params: { pageId: '5e3f16606dc947959ed26995209037ee' } },
      { params: { pageId: '128b255791674917b5f315e9cc46b5d8' } },
      { params: { pageId: 'a38132152b6c4281b880019f956cf8e4' } }
    ]);
  });
});
