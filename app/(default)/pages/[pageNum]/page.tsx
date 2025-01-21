import { notFound } from 'next/navigation';
import { PostListContent } from '@/components/layout/PostListContent';
import { getPageItems as getNotionPageItems } from '@/lib/notion/pages/getPageItems';
import { getPathPages } from '@/lib/notion/pages/getPathPages';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export const revalidate = ISR_REVALIDATE_TIME;

interface PageProps {
  params: Promise<{ pageNum: string }>;
}

export default async function Page({ params }: PageProps) {
  const pageNum = Number((await params).pageNum);
  const { pageItems, pageLength } = await getPageItems(Number(pageNum));
  const tags = await getTags();

  return (
    <>
      {pageItems.length ? (
        <PostListContent
          data={pageItems}
          tags={tags}
          pageOptions={{
            pageLength,
            pageNum
          }}
        />
      ) : (
        <div>데이터가 존재하지 않습니다.</div>
      )}
    </>
  );
}

const getPageItems = async (pageNum: number) => {
  try {
    const pageItems = await getNotionPageItems();
    const parsePageItems = parseDatabaseItems(pageItems);
    const currentPageItems = getPaginationItems(parsePageItems, pageNum);
    const pageLength = getPaginationLength(parsePageItems);

    return { pageItems: currentPageItems, pageLength };
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const getTags = async () => {
  return await getTagsWithPostCnt();
};

export const generateStaticParams = async () => {
  return await getPathPages();
};
