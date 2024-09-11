import { getTagsWithPostCnt } from '../getTagsWithPostCnt';

describe('getTagsWithPostCnt', () => {
  it('태그와 해당 태그의 페이지 수 정보 반환', async () => {
    const resTagMap = await getTagsWithPostCnt();

    const tagMap = new Map<string, number>([
      ['tag name_1-1', 2],
      ['tag name_1-2', 2],
      ['tag name_2-1', 2],
      ['tag name_2-2', 2],
      ['tag name_3-1', 2],
      ['tag name_3-2', 2],
      ['tag name_4-1', 2],
      ['tag name_4-2', 2],
      ['tag name_5-1', 2],
      ['tag name_5-2', 2]
    ]);

    expect(resTagMap).toEqual(tagMap);
  });
});
