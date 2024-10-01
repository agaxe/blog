import mockItems from '@/mocks/parsePageItems';
import { getPaginationItems } from '../getPaginationItems';

jest.mock('@/shared/variable', () => ({
  pageSize: 3 // 페이지 최대 아이템 개수
}));

describe('utils/getPaginationItems', () => {
  let getPaginationItemsFn: typeof getPaginationItems;

  beforeAll(async () => {
    getPaginationItemsFn = await import('../getPaginationItems').then(
      ({ getPaginationItems }) => getPaginationItems
    );
  });

  it('현재 페이지가 1페이지면 아이템이 총 3개 반환된다.', () => {
    const items = getPaginationItemsFn(mockItems, 1);

    expect(items.length).toBe(3);
  });

  it('현재 페이지가 1페이지인 경우, 1~3번째의 아이템이 반환된다.', () => {
    const items = getPaginationItemsFn(mockItems, 1);

    expect(items[0].title).toBe('포스트 제목_1');
    expect(items.at(-1)?.title).toBe('포스트 제목_3');
  });

  it('현재 페이지가 2페이지인 경우, 4~6번째의 아이템이 반환된다.', () => {
    const items = getPaginationItemsFn(mockItems, 2);

    expect(items[0].title).toBe('포스트 제목_4');
    expect(items.at(-1)?.title).toBe('포스트 제목_6');
  });

  it('마지막 페이지인 경우 나머지 아이템이 반환된다.', () => {
    const pageLength = Math.ceil(mockItems.length / 3);
    const items = getPaginationItemsFn(mockItems, pageLength);

    expect(items.length).toBe(1);
    expect(items[0].title).toBe('포스트 제목_10');
  });
});
