import { describe, expect, it } from '@jest/globals';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('date type', () => {
    const date = new Date('1995-10-05');

    expect(formatDate(date)).toBe('1995년 10월 5일');
  });

  it('timestamp type', () => {
    const date = new Date('1995-10-05').getTime();

    expect(formatDate(date)).toBe('1995년 10월 5일');
  });

  it('ISO type', () => {
    const iso = new Date('1995-08-25').toISOString();

    expect(formatDate(iso)).toBe('1995년 8월 25일');
  });
});
