import { getPageTitle } from 'notion-utils';
import { notionClient, notionHqClient } from '@/lib/notion/config';
import mockNotionClient from '@/mocks/notionClient';
import mockNotionPageRelation from '@/mocks/notionPageRelation';
import mockNotionPageRollup from '@/mocks/notionPageRollup';
import PageSeries from '../PageSeries';

jest.mock('@/lib/notion/config', () => ({
  notionClient: { getPage: jest.fn() },
  notionHqClient: {
    pages: {
      properties: {
        retrieve: jest.fn()
      }
    }
  }
}));

class TestPageSeries extends PageSeries {
  constructor() {
    super('TEST_PAGE_ID');
  }
  get hasSeries() {
    return this._hasSeries;
  }

  set hasSeries(val: boolean) {
    this._hasSeries = val;
  }
}

describe('getPageSeries/PageSeries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSeriesTitle', () => {
    it('포스트 시리즈 페이지가 존재하면 시리즈 페이지 타이틀 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      jest
        .spyOn(pageSeries, 'getPageRelationId')
        .mockResolvedValueOnce('3583beab-06bf-4cea-baac-9546b81926ee');
      (notionClient.getPage as jest.Mock).mockResolvedValueOnce(
        mockNotionClient.getPage()
      );
      (getPageTitle as jest.Mock).mockReturnValueOnce('페이지 타이틀');

      const seriesTitle = await pageSeries.getSeriesTitle();

      expect(seriesTitle).toBe('페이지 타이틀');
    });

    it('포스트 시리즈가 존재하지 않으면 null 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = false;
      jest
        .spyOn(pageSeries, 'getPageRelationId')
        .mockResolvedValueOnce('3583beab-06bf-4cea-baac-9546b81926ee');
      const seriesTitle = await pageSeries.getSeriesTitle();

      expect(seriesTitle).toBeNull();
    });

    it('포스트 시리즈 페이지 id 가 존재하지 않으면 null 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      jest
        .spyOn(pageSeries, 'getPageRelationId')
        .mockResolvedValueOnce(undefined);
      const seriesTitle = await pageSeries.getSeriesTitle();

      expect(seriesTitle).toBeNull();
    });

    it('포스트 시리즈 페이지 id 를 통해 정보를 조회하지 못한 경우 에러 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      jest
        .spyOn(pageSeries, 'getPageRelationId')
        .mockResolvedValueOnce('3583beab-06bf-4cea-baac-9546b81926ee');
      (notionClient.getPage as jest.Mock).mockRejectedValueOnce(
        new Error('Not found relation')
      );

      await expect(pageSeries.getSeriesTitle()).rejects.toThrow(
        'Not found relation'
      );
    });
  });

  describe('getSeriesInPages', () => {
    it('포스트 시리즈의 하위 페이지에 대한 아이디, 페이지 타이틀 정보를 담은 배열 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      jest
        .spyOn(pageSeries, 'getPageRollupResults')
        .mockResolvedValueOnce(mockNotionPageRollup.results);
      (notionClient.getPage as jest.Mock).mockResolvedValueOnce(
        mockNotionClient.getPage()
      );
      (getPageTitle as jest.Mock).mockReturnValue('[MOCK] 페이지 타이틀');
      const mockSeriesInPages = [
        {
          id: 'ad21426e908111efac4b325096b39f47',
          title: '[MOCK] 페이지 타이틀'
        },
        {
          id: 'ad214462908111ef8bd4325096b39f47',
          title: '[MOCK] 페이지 타이틀'
        },
        {
          id: 'ad2144d0908111efa2dc325096b39f47',
          title: '[MOCK] 페이지 타이틀'
        },
        {
          id: 'ad214520908111efacb9325096b39f47',
          title: '[MOCK] 페이지 타이틀'
        }
      ];
      const seriesInPages = await pageSeries.getSeriesInPages();

      expect(seriesInPages).toEqual(mockSeriesInPages);
    });

    it('포스트 시리즈의 하위 페이지 아이템 데이터를 조회하지 못한 경우 에러 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      jest
        .spyOn(pageSeries, 'getPageRollupResults')
        .mockResolvedValueOnce(mockNotionPageRollup.results);
      (notionClient.getPage as jest.Mock).mockRejectedValueOnce(
        new Error('Not found page')
      );

      await expect(pageSeries.getSeriesInPages()).rejects.toThrow(
        'Not found page'
      );
    });

    it('포스트 시리즈의 하위 페이지가 존재하지 않으면 null 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = false;
      const seriesInPages = await pageSeries.getSeriesInPages();

      expect(seriesInPages).toBeNull();
    });
  });

  describe('getPageRelationId', () => {
    it('포스트에 시리즈가 존재하는 경우 시리즈 페이지 id 값 반환 ', async () => {
      const pageSeries = new TestPageSeries();
      (
        notionHqClient.pages.properties.retrieve as jest.Mock
      ).mockResolvedValueOnce(mockNotionPageRelation);

      const result = await pageSeries.getPageRelationId();

      expect(pageSeries.hasSeries).toBe(true);
      expect(result).toBe('11d65441-5bbc-801a-9db6-c7e0436b161a');
    });

    it('포스트에 시리즈가 존재하지 않는 경우 undefined 반환', async () => {
      const pageSeries = new TestPageSeries();
      (
        notionHqClient.pages.properties.retrieve as jest.Mock
      ).mockResolvedValueOnce({
        results: []
      });

      const result = await pageSeries.getPageRelationId();

      expect(pageSeries.hasSeries).toBe(false);
      expect(result).toBeUndefined();
    });
  });

  describe('getPageRollupResults', () => {
    it('포스트 시리즈에 하위 페이지가 존재하는 경우 하위 페이지 리스트 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      (
        notionHqClient.pages.properties.retrieve as jest.Mock
      ).mockResolvedValueOnce(mockNotionPageRollup);
      const pageRollup = await pageSeries.getPageRollupResults();

      expect(pageRollup).toEqual(mockNotionPageRollup.results);
    });

    it('포스트 시리즈가 존재하지 않는 경우 undefined 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = false;
      const pageRollup = await pageSeries.getPageRollupResults();

      expect(pageRollup).toEqual(undefined);
    });

    it('포스트 시리즈의 하위 페이지를 조회하지 못한 경우 에러 반환', async () => {
      const pageSeries = new TestPageSeries();

      pageSeries.hasSeries = true;
      (
        notionHqClient.pages.properties.retrieve as jest.Mock
      ).mockRejectedValueOnce(new Error('Not found rollup'));

      await expect(pageSeries.getPageRollupResults()).rejects.toThrow(
        'Not found rollup'
      );
    });
  });
});
