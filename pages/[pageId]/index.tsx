import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import NotionPage from '@/components/notion/NotionPage';
import { getDatabaseItems, getPageItem } from '@/lib/notion';

interface PostProps {
  recordMap: ExtendedRecordMap;
  pageTitle: string;
}

export default function Post({ recordMap, pageTitle }: PostProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NotionPage recordMap={recordMap} />
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
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const databaseItems = await getDatabaseItems(databaseId);
  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};
