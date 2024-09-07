import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import mockPageItems from '@/mocks/parsePageItems';
import { getPaginationLength } from '../getPaginationLength';

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
    const pageLength = getPaginationLengthFn(mockPageItems);

    expect(pageLength).toBe(4);
  });

  it('총 페이지 수 (아이템 5개, 3개씩)', () => {
    const items = mockPageItems.filter((_, i) => i > 5);
    const pageLength = getPaginationLengthFn(items);

    expect(pageLength).toBe(2);
  });
});
