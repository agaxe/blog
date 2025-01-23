import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostListContent } from '@/components/layout/PostListContent';
import { TagPageTitleSection } from '@/components/layout/TagPageTitleSection';
import { getPageItems as getNotionPageItems } from '@/lib/notion/pages/getPageItems';
import { getPathTagPages } from '@/lib/notion/tags/getPathTagPages';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { convertHyphenToBlank } from '@/utils/convertHyphenToBlank';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export async function generateMetadata({
  params
}: {
  params: Promise<{ tagName: string }>;
}): Promise<Metadata> {
  const resolveParams = await params;
  const tagName = decodeURI(resolveParams.tagName);
  const pascalTagName = convertHyphenToBlank(convertPascalCase(tagName));
  const postItems = await getNotionPageItems({ tagName });

  return {
    title: `${pascalTagName} (${postItems.length})`
  };
}

interface PageProps {
  params: Promise<{ tagName: string; pageNum: string }>;
}

export default async function TagDetailPage({ params }: PageProps) {
  const resolveParams = await params;
  const tagName = decodeURI(resolveParams.tagName);
  const pascalTagName = convertHyphenToBlank(convertPascalCase(tagName));

  const { pageItems, pageOptions } = await getPageItems({
    ...resolveParams,
    tagName
  });
  const tags = await getTags();

  return (
    <>
      <TagPageTitleSection tagName={pascalTagName} />
      <>
        {pageItems.length ? (
          <PostListContent
            data={pageItems}
            tags={tags}
            pageOptions={pageOptions}
          />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </>
    </>
  );
}

const getPageItems = async (params: Awaited<PageProps['params']>) => {
  const { tagName } = params;
  const pageNum = Number(params.pageNum);

  try {
    const tagNameWithBlank = convertHyphenToBlank(convertPascalCase(tagName));
    const pageItems = await getNotionPageItems({ tagName: tagNameWithBlank });
    const parsePageItems = parseDatabaseItems(pageItems);
    const currentPageItems = getPaginationItems(parsePageItems, pageNum);
    const pageLength = getPaginationLength(parsePageItems);

    return {
      pageItems: currentPageItems,
      tagName: tagNameWithBlank,
      postCnt: pageItems.length,
      pageOptions: {
        pageLength,
        pageNum,
        pagePath: `/tags/${tagName}`
      }
    };
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const getTags = async () => {
  return await getTagsWithPostCnt();
};

export const generateStaticParams = async () => {
  return await getPathTagPages();
};
