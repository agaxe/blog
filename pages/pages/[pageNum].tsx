import React from 'react';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { SWRConfig } from 'swr';
import { Seo } from '@/components/common/Seo';
import { PageLayout } from '@/components/layout/PageLayout';
import { PostListContent } from '@/components/layout/PostListContent';
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getPathPages } from '@/lib/notion/pages/getPathPages';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { NavPageOptionsFallback } from '@/shared/types/NavPageOptionsFallback';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface PageProps {
  items: ParseDatabaseItemsType[];
  pageLength: number;
  pageNum: number;
  fallback: NavPageOptionsFallback;
}

export default function Page({ items = [], fallback }: PageProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <Seo />
      <PageLayout>
        {items.length ? (
          <PostListContent data={items} />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </PageLayout>
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const pageNum = Number(params?.pageNum) || 0;

  try {
    const [data, tags] = await Promise.all([
      await getPageItems(),
      await getTagsWithPostCnt()
    ]);

    const parseItems = parseDatabaseItems(data);
    const items = getPaginationItems(parseItems, pageNum);
    const pageLength = getPaginationLength(parseItems);

    return {
      props: {
        items,
        fallback: {
          [SwrFallbackKeys.PAGE_OPTIONS]: {
            pageLength,
            pageNum
          },
          [SwrFallbackKeys.TAGS_WITH_CNT]: Object.fromEntries(tags)
        }
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathPages();

  return {
    paths,
    fallback: false
  };
};
