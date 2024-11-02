import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { SWRConfig } from 'swr';
import { Loading } from '@/components/common/Loading';
import { Seo } from '@/components/common/Seo';
import { PageLayout } from '@/components/layout/PageLayout';
import { NotionPage } from '@/components/notion/NotionPage';
import { getPageItem } from '@/lib/notion/page/getPageItem';
import { getPageSeries } from '@/lib/notion/page/getPageSeries';
import { getPathPage } from '@/lib/notion/page/getPathPage';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { PostSeriesFallback } from '@/shared/types/PostSeriesFallback';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

interface PostProps {
  recordMap: ExtendedRecordMap;
  pageTitle: string;
  fallback: PostSeriesFallback;
}

export default function Post({ recordMap, pageTitle, fallback }: PostProps) {
  const { isFallback } = useRouter();

  return (
    <SWRConfig value={{ fallback }}>
      <Seo title={pageTitle} />
      <Loading isShow={isFallback} />
      {!isFallback && (
        <PageLayout>
          <NotionPage recordMap={recordMap} />
        </PageLayout>
      )}
    </SWRConfig>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageId = context?.params?.pageId as string;

  try {
    const recordMap = await getPageItem(pageId);
    const pageTitle = getPageTitle(recordMap);
    const postSeries = await getPageSeries(pageId);

    return {
      props: {
        recordMap,
        pageTitle,
        fallback: {
          [SwrFallbackKeys.POST_SERIES]: postSeries ?? {}
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
  const paths = await getPathPage();

  return {
    paths,
    fallback: true
  };
};
