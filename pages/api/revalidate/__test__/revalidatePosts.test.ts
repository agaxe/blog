import type { NextApiRequest, NextApiResponse } from 'next';
import { getPathPage } from '@/lib/notion/page/getPathPage';
import { revalidatePosts } from '../revalidatePosts';

jest.mock('@/lib/notion/page/getPathPage');

(getPathPage as jest.Mock).mockResolvedValue([
  { params: { pageId: 'c9d287d3-6ecc-476a-9c4e-c9d8b98c9a6e' } },
  { params: { pageId: '192ed407-1faa-47cc-be65-878e28af5e3a' } },
  { params: { pageId: 'ed748e76-7c25-4bc0-a9a8-7255245d555c' } }
]);

describe('revalidatePosts', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;

  beforeEach(() => {
    mockRes = {
      revalidate: jest.fn()
    };
  });

  afterEach(() => {
    mockReq = {
      query: {}
    };
  });

  it('postId 가 존재하지 않는 경우', async () => {
    mockReq = {
      query: {
        postId: ''
      }
    };

    const res = await revalidatePosts(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual([
      '/c9d287d3-6ecc-476a-9c4e-c9d8b98c9a6e',
      '/192ed407-1faa-47cc-be65-878e28af5e3a',
      '/ed748e76-7c25-4bc0-a9a8-7255245d555c'
    ]);
    expect(mockRes.revalidate).toHaveBeenCalledTimes(3);
  });

  it('postId 가 존재하는 경우', async () => {
    mockReq = {
      query: {
        postId: 'd1caf249-11e9-42ff-aab8-f14a422f9945'
      }
    };

    const res = await revalidatePosts(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toBe('/d1caf249-11e9-42ff-aab8-f14a422f9945');
    expect(mockRes.revalidate).toHaveBeenCalledTimes(1);
  });
});
