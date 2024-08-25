import { describe, expect, it } from '@jest/globals';
import mockItems from '../mocks/databaseItems';
import { parseDatabaseItems } from '../parseDatabaseItems';

describe('parseDatabaseItems', () => {
  it('포스팅 수', () => {
    const items = parseDatabaseItems(mockItems);

    expect(items.length).toBe(5);
  });

  it('포스팅 아이템', () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('koId')).toBe(true);
    expect(item.hasOwnProperty('id')).toBe(true);
    expect(item.title).toBe('포스팅 타이틀_1');
    expect(item.hasOwnProperty('tags')).toBe(true);
    expect(item.createdAt).toBe('2022-11-08T14:21:00.000Z');
    expect(items[1].createdAt).toBe('');
    expect(item.hasOwnProperty('isCompleted')).toBe(true);
  });
});
