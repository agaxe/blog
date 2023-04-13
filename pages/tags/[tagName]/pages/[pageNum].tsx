import React from 'react';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { Loading } from '@/components/common/Loading';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { TagPageHeader } from '@/components/layout/TagPageHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getDatabaseItems } from '@/lib/notion/pages';
import { getPathTagPages } from '@/lib/notion/tags';
import { NavPageOptionsFallbackType } from '@/shared/types';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface PageProps {
  tagName: string;
  items: ParseDatabaseItemsType[];
  fallback: NavPageOptionsFallbackType;
}

export default function TagDetailPage({
  tagName = '',
  items = [],
  fallback
}: PageProps) {
  const { isFallback } = useRouter();

  return (
    <SWRConfig
      value={{
        fallback
      }}
    >
      <Seo title={tagName ? `tag: ${tagName}` : undefined} />
      <Loading isShow={isFallback} />
      {!isFallback && (
        <Layout>
          <TagPageHeader tagName={convertPascalCase(String(tagName))} />
          <div>
            {items.length ? (
              <NotionPageList data={items} />
            ) : (
              <div>데이터가 존재하지 않습니다.</div>
            )}
          </div>
        </Layout>
      )}
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const pageNum = Number(params?.pageNum) || 0;
  const tagName = params?.tagName as string;

  try {
    const data = await getDatabaseItems({ tagName });
    const parseItem = parseDatabaseItems(data);
    const items = getPaginationItems(parseItem, pageNum);
    const pageLength = getPaginationLength(data);

    return {
      props: {
        items,
        tagName,
        fallback: {
          'page-options': {
            pageLength,
            pageNum,
            pagePath: `/tags/${tagName}`
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
  const paths = await getPathTagPages();

  return {
    paths,
    fallback: false
  };
};
