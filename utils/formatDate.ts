import { format } from 'date-fns';

export const formatDate = (
  dateInfo: Date | number | string,
  formatString = 'yyyy년 M월 d일'
) => {
  const date = new Date(dateInfo);
  return format(date, formatString);
};
