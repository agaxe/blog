import {
  GetPagePropertyResponse,
  PropertyItemPropertyItemListResponse
} from '@notionhq/client/build/src/api-endpoints';
import { getPageTitle, parsePageId } from 'notion-utils';
import { notionClient } from '@/lib/notion/config';
import { notionHqClient } from '@/lib/notion/config';
import { convertUuidToPostId } from '@/utils/convertUuidToPostId';

const RELATION_PROP_KEY = 'tK%5D%3F';
const ROLLUP_PROP_KEY = ']ksp';

class PageSeries {
  pageId: string;
  protected _hasSeries = false;

  constructor(pageId: string) {
    this.pageId = pageId;
  }

  get hasSeries() {
    return this._hasSeries;
  }

  async getSeriesTitle() {
    const relationId = await this.getPageRelationId();

    if (!this._hasSeries || !relationId) return null;

    const seriesPage = await notionClient.getPage(relationId);
    return getPageTitle(seriesPage);
  }

  async getSeriesInPages() {
    const pageRollupResults = await this.getPageRollupResults();

    if (!pageRollupResults) return null;

    const seriesInPages = await Promise.all(
      pageRollupResults.map(async (prop) => {
        if (!('relation' in prop)) return null;

        const seriesInPageId = prop.relation.id;
        const seriesInPage = await notionClient.getPage(seriesInPageId);
        const seriesInPageTitle = getPageTitle(seriesInPage);

        return {
          id: convertUuidToPostId(seriesInPageId),
          title: seriesInPageTitle
        };
      })
    );

    return seriesInPages.filter((series) => series !== null);
  }

  async getPageRelationId() {
    const relation = await notionHqClient.pages.properties.retrieve({
      page_id: parsePageId(this.pageId) ?? '',
      property_id: RELATION_PROP_KEY
    });

    if (!this.isRelationOrRollupRes(relation)) return;

    this._hasSeries = relation.results.length > 0;

    if (this._hasSeries && 'relation' in relation.results[0]) {
      return relation.results[0].relation.id;
    }
  }

  async getPageRollupResults() {
    if (!this._hasSeries) return;

    const pageRollup = await notionHqClient.pages.properties.retrieve({
      page_id: parsePageId(this.pageId) ?? '',
      property_id: ROLLUP_PROP_KEY
    });

    if (!this.isRelationOrRollupRes(pageRollup)) return;

    return pageRollup.results;
  }

  private isRelationOrRollupRes(
    relation: GetPagePropertyResponse
  ): relation is PropertyItemPropertyItemListResponse {
    return 'results' in relation && Array.isArray(relation.results);
  }
}

export default PageSeries;
