export const normalizeTitleKo = (title: string) => {
  return title
    .replace(/ /g, '-')
    .replace(/--/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .trim();
};
