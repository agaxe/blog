import React from 'react';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { SWRConfig } from 'swr';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getDatabaseItems } from '@/lib/notion/pages';
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
      <Layout>
        <MainHeader />
        <div>
          {items.length ? (
            <NotionPageList data={items} />
          ) : (
            <div>데이터가 존재하지 않습니다.</div>
          )}
        </div>
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
    const data = await getDatabaseItems();
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
          }
        }
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDatabaseItems();
  const items = parseDatabaseItems(data);
  const pageLength = getPaginationLength(items);

  const params = [...Array(pageLength)].map((v, i) => ({
    params: { pageNum: String(i + 1) }
  }));

  return {
    paths: params,
    fallback: true
  };
};
