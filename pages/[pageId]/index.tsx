import React from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import NotionPage from '@/components/notion/NotionPage';
import { getPageItem, getDatabaseItems } from '@/lib/notion';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

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
  const recordMap = await getPageItem(pageId);
  const pageTitle = getPageTitle(recordMap);

  return {
    props: {
      recordMap,
      pageTitle
    },
    revalidate: ISR_REVALIDATE_TIME
  };
};

export async function getStaticPaths() {
  const databaseId = process.env.NOTION_DB_ID;
  if (!databaseId)
    return {
      notFound: true
    };

  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId
    }
  }));

  return {
    paths,
    fallback: true
  };
}
