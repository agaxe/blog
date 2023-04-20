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
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getPathTagPages } from '@/lib/notion/tags/getPathTagPages';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { NavPageOptionsFallback } from '@/shared/types/NavPageOptionsFallback';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface PageProps {
  tagName: string;
  items: ParseDatabaseItemsType[];
  fallback: NavPageOptionsFallback;
  postCnt: number;
}

export default function TagDetailPage({
  tagName = '',
  items = [],
  fallback,
  postCnt = 0
}: PageProps) {
  const { isFallback } = useRouter();
  const pascalTagName = convertPascalCase(tagName);

  return (
    <SWRConfig
      value={{
        fallback
      }}
    >
      <Seo title={tagName ? `${pascalTagName} (${postCnt})` : undefined} />
      <Loading isShow={isFallback} />
      {!isFallback && (
        <Layout>
          <TagPageHeader tagName={pascalTagName} />
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
    const [data, tags] = await Promise.all([
      await getPageItems({ tagName }),
      await getTagsWithPostCnt()
    ]);

    const parseItem = parseDatabaseItems(data);
    const items = getPaginationItems(parseItem, pageNum);
    const pageLength = getPaginationLength(items);

    return {
      props: {
        items,
        tagName: convertPascalCase(tagName),
        postCnt: data.length,
        fallback: {
          'page-options': {
            pageLength,
            pageNum,
            pagePath: `/tags/${tagName}`
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
  const paths = await getPathTagPages();

  return {
    paths,
    fallback: false
  };
};
