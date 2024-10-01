import { formatDate } from '../formatDate';

describe('utils/formatDate', () => {
  it('Date 타입을 특정 format 의 날짜로 변환시킨다.', () => {
    const date = new Date('1995-10-05');

    expect(formatDate(date, 'yyyy년 M월 d일')).toBe('1995년 10월 5일');
  });

  it('timestamp 를 특정 format 의 날짜로 변환시킨다.', () => {
    const date = new Date('1995-10-05').getTime();

    expect(formatDate(date, 'yyyy년 M월 d일')).toBe('1995년 10월 5일');
  });

  it('ISO 형식을 특정 format 의 날짜로 변환시킨다.', () => {
    const iso = new Date('1995-08-25').toISOString();

    expect(formatDate(iso, 'yyyy년 M월 d일')).toBe('1995년 8월 25일');
  });
});
