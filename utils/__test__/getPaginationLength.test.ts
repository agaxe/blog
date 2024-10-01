import mockPageItems from '@/mocks/parsePageItems';
import { getPaginationLength } from '../getPaginationLength';

jest.mock('@/shared/variable', () => ({
  pageSize: 3 // 페이지 최대 아이템 개수
}));

describe('utils/getPaginationLength', () => {
  let getPaginationLengthFn: typeof getPaginationLength;

  beforeAll(async () => {
    getPaginationLengthFn = await import('../getPaginationLength').then(
      ({ getPaginationLength }) => getPaginationLength
    );
  });

  it('아이템의 개수가 10개면 페이지는 4페이지 존재한다.', () => {
    const pageLength = getPaginationLengthFn(mockPageItems);

    expect(pageLength).toBe(4);
  });

  it('아이템의 개수가 5개면 페이지는 2페이지 존재한다.', () => {
    const items = mockPageItems.filter((_, i) => i > 5);
    const pageLength = getPaginationLengthFn(items);

    expect(pageLength).toBe(2);
  });
});
