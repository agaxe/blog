import { describe, expect, it } from '@jest/globals';
import mockItems from '@/mocks/dbPageItems';
import { parseDatabaseItems } from '../parseDatabaseItems';

describe('parseDatabaseItems', () => {
  it('포스팅 수', () => {
    const items = parseDatabaseItems(mockItems);

    expect(items.length).toBe(10);
  });

  it('포스팅 아이템', () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('koId')).toBe(true);
    expect(item.hasOwnProperty('id')).toBe(true);
    expect(item.title).toBe('포스트 제목_1');
    expect(item.hasOwnProperty('tags')).toBe(true);
    expect(item.createdAt).toBe('2024-04-29T11:33:00.000Z');
    expect(item.hasOwnProperty('isCompleted')).toBe(true);
  });
});
