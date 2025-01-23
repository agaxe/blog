import { ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageTitle } from 'notion-utils';
import { NotionPage } from '@/components/notion/NotionPage';
import { getPageItem } from '@/lib/notion/page/getPageItem';
import { getPageSeries } from '@/lib/notion/page/getPageSeries';
import { getPathPage } from '@/lib/notion/page/getPathPage';

interface PageProps {
  params: Promise<{ pageId: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ pageId: string }>;
}) {
  const resolveParams = await params;
  const recordMap = await getPageItem(resolveParams.pageId);
  const pageTitle = getPageTitle(recordMap);

  return {
    title: pageTitle
  };
}

export default async function Post({ params }: PageProps) {
  const { pageId } = await params;
  const { recordMap, postSeries } = await getPage(pageId);

  return <NotionPage recordMap={recordMap} postSeries={postSeries} />;
}

const getPage = async (pageId: Awaited<PageProps['params']>['pageId']) => {
  try {
    const recordMap = await getPageItem(pageId);
    const postSeries = await getPageSeries(pageId);

    return {
      recordMap,
      postSeries
    };
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export const generateStaticParams = async () => {
  return await getPathPage();
};
