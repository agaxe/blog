import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { Loading } from '@/components/common/Loading';
import { Seo } from '@/components/common/Seo';
import NotionPage from '@/components/notion/NotionPage';
import { getPageItem } from '@/lib/notion/page/getPageItem';
import { getPathPage } from '@/lib/notion/page/getPathPage';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

interface PostProps {
  recordMap: ExtendedRecordMap;
  pageTitle: string;
}

export default function Post({ recordMap, pageTitle }: PostProps) {
  const { isFallback } = useRouter();

  return (
    <>
      <Seo title={pageTitle} />
      <Loading isShow={isFallback} />
      {!isFallback && <NotionPage recordMap={recordMap} />}
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageId = context?.params?.pageId as string;

  try {
    const recordMap = await getPageItem(pageId);
    const pageTitle = getPageTitle(recordMap);

    return {
      props: {
        recordMap,
        pageTitle
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
