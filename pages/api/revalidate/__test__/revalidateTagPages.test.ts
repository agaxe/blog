import { NextApiRequest, NextApiResponse } from 'next';
import { getPathTagPages } from '@/lib/notion/tags/getPathTagPages';
import { revalidateTagPages } from '../revalidateTagPages';

jest.mock('@/lib/notion/tags/getPathTagPages');

describe('revalidateTagPages', () => {
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

  it('tagName 이 존재하지 않는 경우', async () => {
    mockReq = {
      query: {
        tagName: ''
      }
    };

    (getPathTagPages as jest.Mock).mockResolvedValue([
      { params: { tagName: 'tag-1', pageNum: '2' } },
      { params: { tagName: 'tag-2', pageNum: '3' } },
      { params: { tagName: 'tag-3', pageNum: '4' } }
    ]);

    const res = await revalidateTagPages(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual([
      `/tags/tag-1/pages/2`,
      `/tags/tag-2/pages/3`,
      `/tags/tag-3/pages/4`
    ]);

    expect(mockRes.revalidate).toHaveBeenCalledTimes(3);
  });

  it('tagName 이 존재하는 경우', async () => {
    mockReq = {
      query: {
        tagName: 'tag-1'
      }
    };

    (getPathTagPages as jest.Mock).mockResolvedValue([
      { params: { tagName: 'tag-1', pageNum: '2' } }
    ]);

    const res = await revalidateTagPages(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual([`/tags/tag-1/pages/2`]);
    expect(mockRes.revalidate).toHaveBeenCalledTimes(1);
  });
});
