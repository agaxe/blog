import mockItems from '@/mocks/notionPageItems';
import { parseDatabaseItems } from '../parseDatabaseItems';

describe('utils/parseDatabaseItems', () => {
  it('아이템 수를 받은 만큼 반환한다.', () => {
    const items = parseDatabaseItems(mockItems);

    expect(items.length).toBe(10);
  });

  it(`반환된 리스트의 아이템에 'koId' 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('koId')).toBe(true);
  });

  it(`반환된 리스트의 아이템에 'id'(포스트 아이디) 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('id')).toBe(true);
  });

  it(`반환된 리스트의 아이템에 'title'(포스트 제목) 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.title).toBe('포스트 제목_1');
  });

  it(`반환된 리스트의 아이템에 'tags'(포스트 태그 리스트) 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('tags')).toBe(true);
  });

  it(`반환된 리스트의 아이템에 'createdAt'(포스트 작성일) 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.createdAt).toBe('2024-04-29T11:33:00.000Z');
  });

  it(`반환된 리스트의 아이템에 'isCompleted'(작성 완료 여부) 값이 존재한다.`, () => {
    const items = parseDatabaseItems(mockItems);
    const item = items[0];

    expect(item.hasOwnProperty('isCompleted')).toBe(true);
  });
});
