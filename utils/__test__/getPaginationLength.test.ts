import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { getPaginationLength } from '../getPaginationLength';
import mockItems from '../mocks/parseDatabaseItems';

jest.mock('@/shared/variable', () => ({
  pageSize: 3
}));

describe('getPaginationLength', () => {
  let getPaginationLengthFn: typeof getPaginationLength;

  beforeAll(async () => {
    getPaginationLengthFn = await import('../getPaginationLength').then(
      ({ getPaginationLength }) => getPaginationLength
    );
  });

  it('총 페이지 수 (아이템 10개, 3개씩)', () => {
    const pageLength = getPaginationLengthFn(mockItems);

    expect(pageLength).toBe(4);
  });

  it('총 페이지 수 (아이템 5개, 3개씩)', () => {
    const items = mockItems.filter((_, i) => i > 5);
    const pageLength = getPaginationLengthFn(items);

    expect(pageLength).toBe(2);
  });
});
