import mockNotionDB from '@/mocks/notionDB';
import { getPathTagPages } from '../getPathTagPages';
import { getTagItems } from '../getTagItems';

jest.mock('@/lib/notion/tags/getTagItems');
jest.mock('@/shared/variable', () => ({
  pageSize: 1
}));

const dbTagItems = mockNotionDB.properties.tags.multi_select.options;

describe('getPathTagPages', () => {
  beforeAll(() => {
    (getTagItems as jest.Mock).mockResolvedValue(dbTagItems);
  });

  it('tagName 값이 존재하지 않는 경우', async () => {
    const res = await getPathTagPages();

    expect(res).toEqual([
      { params: { tagName: 'tag-name_1-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_1-1', pageNum: '2' } },
      { params: { tagName: 'tag-name_1-2', pageNum: '1' } },
      { params: { tagName: 'tag-name_1-2', pageNum: '2' } },
      { params: { tagName: 'tag-name_2-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_2-1', pageNum: '2' } },
      { params: { tagName: 'tag-name_2-2', pageNum: '1' } },
      { params: { tagName: 'tag-name_2-2', pageNum: '2' } },
      { params: { tagName: 'tag-name_3-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_3-1', pageNum: '2' } },
      { params: { tagName: 'tag-name_3-2', pageNum: '1' } },
      { params: { tagName: 'tag-name_3-2', pageNum: '2' } },
      { params: { tagName: 'tag-name_4-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_4-1', pageNum: '2' } },
      { params: { tagName: 'tag-name_4-2', pageNum: '1' } },
      { params: { tagName: 'tag-name_4-2', pageNum: '2' } },
      { params: { tagName: 'tag-name_5-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_5-1', pageNum: '2' } },
      { params: { tagName: 'tag-name_5-2', pageNum: '1' } },
      { params: { tagName: 'tag-name_5-2', pageNum: '2' } }
    ]);
  });

  it('tagName 값이 존재하는 경우', async () => {
    const res = await getPathTagPages('tag name_1-1');

    expect(res).toEqual([
      { params: { tagName: 'tag-name_1-1', pageNum: '1' } },
      { params: { tagName: 'tag-name_1-1', pageNum: '2' } }
    ]);
  });
});
