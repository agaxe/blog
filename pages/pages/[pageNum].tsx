import React from 'react';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { SWRConfig } from 'swr';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getPathPages } from '@/lib/notion/pages/getPathPages';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/SwrFallbackKeys';
import { NavPageOptionsFallbackType } from '@/shared/types';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface PageProps {
  items: ParseDatabaseItemsType[];
  pageLength: number;
  pageNum: number;
  fallback: NavPageOptionsFallbackType;
}

export default function Page({ items = [], fallback }: PageProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <Seo />
      <Layout>
        <>
          {items.length ? (
            <NotionPageList data={items} />
          ) : (
            <div>데이터가 존재하지 않습니다.</div>
          )}
        </>
      </Layout>
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
          'page-options': {
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
