import PageSeries from './PageSeries';

export const getPageSeries = async (pageId: string) => {
  const pageSeries = new PageSeries(pageId);
  const seriesTitle = await pageSeries.getSeriesTitle();
  const seriesInPages = await pageSeries.getSeriesInPages();

  if (!pageSeries.hasSeries) return;

  return {
    title: seriesTitle,
    posts: seriesInPages
  };
};
