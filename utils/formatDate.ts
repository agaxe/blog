export const formatDate = (dateInfo: Date | number | string, options = {}) => {
  const date = new Date(dateInfo);

  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    ...options
  }).format(date);
};
