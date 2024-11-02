import { getPageSeries } from '..';
import PageSeries from '../PageSeries';

jest.mock('../PageSeries.ts');

const mockPageSeries = {
  getSeriesTitle: jest.fn(),
  getSeriesInPages: jest.fn(),
  hasSeries: true
};

describe('getPageSeries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (PageSeries as jest.Mock).mockImplementation(() => mockPageSeries);
  });

  it('해당 페이지에 포스트 시리즈가 존재하는 경우, 포스트 시리즈 타이틀과 하위 페이지 리스트 데이터 반환', async () => {
    mockPageSeries.getSeriesTitle.mockResolvedValue('시리즈 타이틀');
    mockPageSeries.getSeriesInPages.mockResolvedValue([
      { id: '3491a172-e402-46e0-8c3a-07ea0670401a', title: '포스트 타이틀 1' },
      { id: 'fc643a73-9ece-4068-a00e-ae0f6106bd5f', title: '포스트 타이틀 2' }
    ]);

    const pageSeries = await getPageSeries('<TEST_PAGE_ID>');

    expect(pageSeries).toEqual({
      title: '시리즈 타이틀',
      posts: [
        {
          id: '3491a172-e402-46e0-8c3a-07ea0670401a',
          title: '포스트 타이틀 1'
        },
        { id: 'fc643a73-9ece-4068-a00e-ae0f6106bd5f', title: '포스트 타이틀 2' }
      ]
    });
  });

  it('해당 페이지에 포스트 시리즈가 존재하지 않는 경우, undefined 반환', async () => {
    mockPageSeries.hasSeries = false;

    const pageSeries = await getPageSeries('<TEST_PAGE_ID>');

    expect(pageSeries).toBeUndefined();
  });
});
