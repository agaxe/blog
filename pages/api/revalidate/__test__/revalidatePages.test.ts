import type { NextApiResponse } from 'next';
import { getPathPages } from '@/lib/notion/pages/getPathPages';
import { revalidatePages } from '../revalidatePages';

jest.mock('@/lib/notion/pages/getPathPages');

const mockPathPages = [
  { params: { pageNum: '1' } },
  { params: { pageNum: '2' } },
  { params: { pageNum: '3' } }
];

describe('revalidatePages', () => {
  let mockRes: Partial<NextApiResponse>;

  beforeAll(() => {
    mockRes = {
      revalidate: jest.fn()
    };

    (getPathPages as jest.Mock).mockResolvedValue(mockPathPages);
  });

  it('getPathPages 반환 값에 따른 반환 값', async () => {
    const res = await revalidatePages(mockRes as NextApiResponse);

    expect(res).toEqual(['/pages/1', '/pages/2', '/pages/3']);
  });

  it('revalidate 실행 수 -> 3번 실행', () => {
    expect(mockRes.revalidate).toHaveBeenCalledTimes(mockPathPages.length);
  });
});
