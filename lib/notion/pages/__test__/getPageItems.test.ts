import { getPageItems } from '../getPageItems';

describe('getPageItems', () => {
  it('option.pageSize 이 5 이면 아이템 갯수 5개 반환', async () => {
    const items = await getPageItems({
      pageSize: 5
    });

    expect(items.length).toBe(5);
  });

  it('option.tagName 의 태그가 존재하는 아이템 반환', async () => {
    const items = await getPageItems({
      pageSize: 5,
      tagName: 'tag name_2-2'
    });

    expect(items.length).toBe(2);
  });
});
