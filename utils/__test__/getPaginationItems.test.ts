import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { getPaginationItems } from '../getPaginationItems';
import mockItems from '../mocks/parseDatabaseItems';

jest.mock('@/shared/variable', () => ({
  pageSize: 3
}));

describe('getPaginationItems', () => {
  let getPaginationItemsFn: typeof getPaginationItems;

  beforeAll(async () => {
    getPaginationItemsFn = await import('../getPaginationItems').then(
      ({ getPaginationItems }) => getPaginationItems
    );
  });

  it('아이템 갯수', () => {
    const items = getPaginationItemsFn(mockItems, 1);

    expect(items.length).toBe(3);
  });

  it('1 페이지', () => {
    const items = getPaginationItemsFn(mockItems, 1);

    expect(items[0].title).toBe('test title_1');
    expect(items.at(-1)?.title).toBe('test title_3');
  });

  it('2 페이지', () => {
    const items = getPaginationItemsFn(mockItems, 2);

    expect(items[0].title).toBe('test title_4');
    expect(items.at(-1)?.title).toBe('test title_6');
  });

  it('마지막 페이지', () => {
    const pageLength = Math.ceil(mockItems.length / 3);
    const items = getPaginationItemsFn(mockItems, pageLength);

    expect(items.length).toBe(1);
    expect(items[0].title).toBe('test title_10');
  });
});
