import { NextApiRequest, NextApiResponse } from 'next';
import revalidate from '../index';

describe('revalidate', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;

  beforeAll(() => {
    process.env = {
      NODE_ENV: 'development',
      BLOG_ODR_TOKEN: 'ODR_TOKEN'
    };

    mockRes = {
      revalidate: jest.fn(() => new Promise((res) => res())),
      json: jest.fn((obj) => obj),
      send: jest.fn((obj) => obj),
      status: jest.fn(() => mockRes as NextApiResponse)
    };
  });

  afterEach(() => {
    mockReq = {};
  });

  it('query.secret 만 존재하는 경우', async () => {
    mockReq = {
      query: {
        secret: 'ODR_TOKEN'
      }
    };

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({
      revalidated: true,
      result: [
        '/',
        [
          '/c9d287d36ecc476a9c4ec9d8b98c9a6e',
          '/192ed4071faa47ccbe65878e28af5e3a',
          '/ed748e767c254bc0a9a87255245d555c',
          '/3f59cda4a5dd449287d591a987cde7d5',
          '/804ded530147482398f970d24d64c3f0',
          '/d1caf24911e942ffaab8f14a422f9945',
          '/6eccf1cfb425446a8cccd5f01222978f',
          '/5e3f16606dc947959ed26995209037ee',
          '/128b255791674917b5f315e9cc46b5d8',
          '/a38132152b6c4281b880019f956cf8e4'
        ],
        ['/pages/1'],
        [
          '/tags/tag-name_1-1/pages/1',
          '/tags/tag-name_1-2/pages/1',
          '/tags/tag-name_2-1/pages/1',
          '/tags/tag-name_2-2/pages/1',
          '/tags/tag-name_3-1/pages/1',
          '/tags/tag-name_3-2/pages/1',
          '/tags/tag-name_4-1/pages/1',
          '/tags/tag-name_4-2/pages/1',
          '/tags/tag-name_5-1/pages/1',
          '/tags/tag-name_5-2/pages/1'
        ]
      ]
    });
  });

  it('query.secret, query.postId 존재', async () => {
    mockReq = {
      query: {
        secret: 'ODR_TOKEN',
        postId: '192ed4071faa47ccbe65878e28af5e3a'
      }
    };

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({
      revalidated: true,
      result: [
        '/',
        '/192ed4071faa47ccbe65878e28af5e3a',
        ['/pages/1'],
        [
          '/tags/tag-name_1-1/pages/1',
          '/tags/tag-name_1-2/pages/1',
          '/tags/tag-name_2-1/pages/1',
          '/tags/tag-name_2-2/pages/1',
          '/tags/tag-name_3-1/pages/1',
          '/tags/tag-name_3-2/pages/1',
          '/tags/tag-name_4-1/pages/1',
          '/tags/tag-name_4-2/pages/1',
          '/tags/tag-name_5-1/pages/1',
          '/tags/tag-name_5-2/pages/1'
        ]
      ]
    });
  });

  it('query.secret, query.tagName 존재', async () => {
    mockReq = {
      query: {
        secret: 'ODR_TOKEN',
        tagName: 'tag name_1-2'
      }
    };

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({
      revalidated: true,
      result: [
        '/',
        [
          '/c9d287d36ecc476a9c4ec9d8b98c9a6e',
          '/192ed4071faa47ccbe65878e28af5e3a',
          '/ed748e767c254bc0a9a87255245d555c',
          '/3f59cda4a5dd449287d591a987cde7d5',
          '/804ded530147482398f970d24d64c3f0',
          '/d1caf24911e942ffaab8f14a422f9945',
          '/6eccf1cfb425446a8cccd5f01222978f',
          '/5e3f16606dc947959ed26995209037ee',
          '/128b255791674917b5f315e9cc46b5d8',
          '/a38132152b6c4281b880019f956cf8e4'
        ],
        ['/pages/1'],
        ['/tags/tag-name_1-2/pages/1']
      ]
    });
  });

  it('query.secret, query.postId, query.tagName 존재', async () => {
    mockReq = {
      query: {
        secret: 'ODR_TOKEN',
        postId: 'a38132152b6c4281b880019f956cf8e4',
        tagName: 'tag name_3-2'
      }
    };

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({
      revalidated: true,
      result: [
        '/',
        '/a38132152b6c4281b880019f956cf8e4',
        ['/pages/1'],
        ['/tags/tag-name_3-2/pages/1']
      ]
    });
  });

  it('query.secret 가 없거나 일치하지 않은 경우', async () => {
    mockReq = {
      query: {
        postId: 'a38132152b6c4281b880019f956cf8e4',
        tagName: 'tag name_3-2'
      }
    };

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({ message: 'Invalid token' });
  });

  it('에러가 발생한 경우', async () => {
    jest.clearAllMocks();
    jest.resetModules();

    mockReq = {
      query: {
        secret: 'ODR_TOKEN',
        test: 'test'
      }
    };

    jest.doMock('../revalidatePosts');

    const { revalidatePosts } = await import('../revalidatePosts');
    const revalidate = await import('../index').then(
      (module) => module.default
    );

    (revalidatePosts as jest.Mock).mockRejectedValue(new Error('error!'));

    const res = await revalidate(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse
    );

    expect(res).toEqual({ error: 'error!' });
  });
});
